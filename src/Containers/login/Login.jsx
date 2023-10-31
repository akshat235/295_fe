import React, { useState } from "react";
import { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import cat_white from "../../assets/cat_white.png";
// import cat_white from ".../assets/cat_white.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");

  // useEffect(() => {
  //   setIsFormValid(
  //     !passwordError &&
  //       !confirmPasswordError &&
  //       firstName &&
  //       lastName &&
  //       email &&
  //       dob
  //   );
  // }, [passwordError, confirmPasswordError, firstName, lastName, email, dob]);

  const navigate = useNavigate();

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
  }, [loginEmailError, loginPasswordError, loginEmail, loginPassword]);

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,5}$/i;
    return emailRegex.test(email);
  }

  const handleLoginEmailChange = (value) => {
    setLoginEmail(value);
    if (!validateEmail(value)) {
      setLoginEmailError("Invalid email format");
    } else {
      setLoginEmailError("");
    }
  };

  const handleLoginPasswordChange = (value) => {
    setLoginPassword(value);
    if (!value) {
      setLoginPasswordError("Invalid password format");
    } else {
      setLoginPassword(value);
      setLoginPasswordError("");
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

    await fetch("https://sequio-mvp-5ecfd4b7501f.herokuapp.com/auth/login", {
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
          localStorage.setItem("userFirstName", datajson.user_data.firstname);
          localStorage.setItem("userID", datajson.user_data.userId);
          console.log("Login successful");
          navigate("/header");
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <div className="sequio__login section__padding" id="home">
        <div className="sequio__login-content">
          <img src={cat_white} alt="Company Logo" />
          <h3 href="#home">SEQUIO</h3>
          <div id="form-auth" className="sequio__login-form">
            <form>
              <div className="form-group">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => handleLoginEmailChange(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => handleLoginPasswordChange(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isLoginFormValid}
                className={isLoginFormValid ? "" : "disabled-button"}
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
