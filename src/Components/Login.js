import React, { useState } from "react";
import { useEffect } from "react";
import "./Login.css";
import CAT from "../assets/CAT.png";

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

  useEffect(() => {
    setIsFormValid(
      !passwordError &&
        !confirmPasswordError &&
        firstName &&
        lastName &&
        email &&
        dob
    );
  }, [passwordError, confirmPasswordError, firstName, lastName, email, dob]);

  useEffect(() => {
    setIsLoginFormValid(!loginEmailError && loginEmail);
  }, [loginEmailError, loginEmail]);
  

  useEffect(() => {
    setIsLoginFormValid(!loginEmailError && !loginPasswordError && loginEmail && loginPassword);
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
  }

  const handleLoginPasswordChange = (value) => {
    setLoginPassword(value);
    if (!value) {
      setLoginPasswordError('Invalid password format');
    } else {
      setLoginPassword(value);
      setLoginPasswordError('');
    }
  };

  const handlePasswordChange = (value) => {
    if (!value) {
      setPasswordError("");
    } else {
      if (
        value.length < 8 ||
        !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value)
      ) {
        setPasswordError(
          "Password should be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
        );
      } else {
        setPasswordError("");
      }
    }
    setPassword(value);
    setIsFormValid(!passwordError && !confirmPasswordError);
  };

  const handleConfirmPasswordChange = (value) => {
    if (!value) {
      setConfirmPasswordError("");
    } else {
      if (value != password) {
        setConfirmPasswordError("Confirm Password should be same as Password.");
      } else {
        setConfirmPasswordError("");
      }
    }
    setConfirmPassword(value);
    setIsFormValid(!passwordError && !confirmPasswordError);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      console.error("Please fill in all required fields.");
      setIsLoginFormValid(false);
      return;
    } 

    const data = {
      username: email,
      password: password,
    };

    fetch("http://127.0.0.1:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setloggedIn(true);
          console.log("Login successful");
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !dob ||
      !password ||
      !confirmPassword
    ) {
      console.error("Please fill in all required fields.");
      setIsFormValid(false);
      return;
    }

    if (isFormValid) {
      const data = {
        username: email,
        password: password,
      };

      fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Registration successful");
          } else {
            console.error("Registration failed");
            setErrorMsg("Registration failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMsg("Network error. Please try again.");
        });
    } else {
      console.error("Form is not valid. Cannot submit.");
      setErrorMsg("Form is not valid. Please check your inputs.");
    }
  };

  return (
    <>
      <header class="header">
        <div class="header-links">
          <a href="#">Plans</a>
          <a href="#">Blog</a>
          <a href="#">About</a>
        </div>
      </header>
      <div className="login-page">
        <div className="logo">
          <img src={CAT} alt="Company Logo" />
          <h1>Sequio</h1>
        </div>
        <div id="form-auth">
          {showLoginForm && (
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => handleLoginEmailChange(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => handleLoginPasswordChange(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isLoginFormValid}
                className={isLoginFormValid ? "" : "disabled-button"}
              >
                Login
              </button>
            </form>
          )}

          {showRegisterForm && (
            <form>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  maxlength="50"
                />
              </div>

              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  maxlength="50"
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  required
                />
                {confirmPasswordError && (
                  <div className="error-message">{confirmPasswordError}</div>
                )}
              </div>
              {errorMsg && <div className="error-message">{errorMsg}</div>}

              <button
                type="button"
                onClick={handleRegister}
                disabled={!isFormValid}
                className={isFormValid ? "" : "disabled-button"}
              >
                Register
              </button>
            </form>
          )}
          {!showLoginForm && !showRegisterForm && (
            <div>
              <button type="button" onClick={() => setShowLoginForm(true)}>
                Login
              </button>
              <p></p>
              <button type="button" onClick={() => setShowRegisterForm(true)}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
