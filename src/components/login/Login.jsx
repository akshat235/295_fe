import React, { useState , useContext} from "react";
import { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import cat_white from "../../assets/cat_white.png";
import AuthContext from "../Auth/AuthContext";

function LoginPage() {
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginEmail, setLoginEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loggedIn] = useState('');
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);
  const BASE_URL = "https://flask-app-413204.wl.r.appspot.com";
  
  useEffect(() => {
    localStorage.setItem("loggedIn", false);
  }, []);

  useEffect(() => {
    setIsLoginFormValid(!loginEmailError && loginEmail);
  }, [loginEmailError, loginEmail]);

  useEffect(() => {
    setIsLoginFormValid(
      !loginEmailError && !loginPasswordError && loginEmail && loginPassword
    );
  }, [loginEmailError, loginPasswordError, loginEmail, loginPassword, loggedIn]);

  const handleLoginEmailChange = (value) => {
    setLoginEmail(value);
    setEmailError('');
  };

  const handleKeyPressValidateEmail = (e) => {
    if (e.key === 'Enter') {
      validateEmail();
    }
  };  
  
  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(loginEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleKeyPressPassword = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      validatePassword();
      if (isLoginFormValid) {
        // Perform login action here
        console.log("Login button clicked after pressing Enter");
        handleLogin(e);
      }
    }
  };

  const handleLoginPasswordChange = (value) => {
    setLoginPassword(value);
    setLoginPasswordError('');
  };

  const validatePassword = () => {
    if (loginPassword.length < 8 ||
      !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(loginPassword) ||
      !/[a-z]/.test(loginPassword) ||
      !/[A-Z]/.test(loginPassword) ||
      !/\d/.test(loginPassword)) {
      setLoginPasswordError('Password should be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
    } else {
      setLoginPasswordError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      console.error("Please fill in all required fields.");
      setIsLoginFormValid(false);
      return;
    }

    const data = {
      username: loginEmail,
      password: loginPassword,
    };

    fetch(BASE_URL+"/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        let datajson;
        datajson = await response.json();
        console.log(datajson);

        if (response.ok) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("loggedInTestPage", true);
          localStorage.setItem("userFirstName", datajson.user_data.firstname);
          localStorage.setItem("userID", datajson.user_data.userId);
          console.log("Login successful");
          // Update the loggedIn state in the context
          setLoggedIn(true);
          localStorage.removeItem("timer");
          localStorage.removeItem("currentIndex");
          navigate("/starttest");
        } else {
          // Failed login, display error message
          localStorage.setItem("loggedIn", false);
          setLoggedIn(false);
          localStorage.setItem("loggedInTestPage", false);
          setLoginPasswordError('Incorrect password. Please try again.');
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <div className="sequio__login section__padding" id="home">
        <div className="sequio__login-form">
          <img src={cat_white} alt="Company Logo" />
          <h3 href="#home">SEQUIO</h3>
          <div id="form-auth" className="sequio__login-form">
            <form className="sequio__login-form-form">
              <div className="form-group center_text">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => handleLoginEmailChange(e.target.value)}
                    onBlur={validateEmail} 
                    placeholder="Email"
                    onKeyDown={handleKeyPressValidateEmail}
                    className="sequio__login-form-input"
                  />
                {emailError && <p className="sequio__login-form-error-message">{emailError}</p>}
              </div>
              <div className="form-group center_text">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => handleLoginPasswordChange(e.target.value)}
                  onBlur={validatePassword}
                  placeholder="Password"
                  onKeyDown={handleKeyPressPassword}
                  className="sequio__login-form-input"
                />
                {loginPasswordError && <p className="sequio__login-form-error-message">{loginPasswordError}</p>}
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isLoginFormValid}
                className={isLoginFormValid ? "sequio__login-form-button" : "sequio__login-form-button disabled-button"}
              >
                <p>Login</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
