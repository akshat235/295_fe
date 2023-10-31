import React, { useState } from "react";
import { useEffect } from "react";
import "./SignUp.css";
import cat_white from "../../assets/cat_white.png";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
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
  
    const navigate = useNavigate();
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
     
      function validateEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,5}$/i;
        return emailRegex.test(email);
      }

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
                firstName: firstName, 
                lastName: lastName,   
                dob: dob              
              };
    
          fetch("https://sequio-mvp-5ecfd4b7501f.herokuapp.com/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Registration successful");
                localStorage.setItem("userFirstName", data.firstName);
                localStorage.setItem("loggedIn", true);
                
                const login_data = {
                  username: email,
                  password: password
                };
            
                fetch("https://sequio-mvp-5ecfd4b7501f.herokuapp.com/auth/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(login_data),
                }).then(response => {
                  let datajson;
                  datajson = response.json();
                  console.log(datajson);
          
                  if (response.ok) {
                    console.log(datajson.user_data.firstName);
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("userFirstName", datajson.user_data.firstname);
                    localStorage.setItem("userID", datajson.user_data.userId);
                    console.log("Login successful");
                    navigate("/header");
              }});
                // localStorage.setItem("userID", data.userName);
                navigate('/header')
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
          <div className="sequio__login section__padding" id="home">
            <div className="sequio__login-content">
                <img src={cat_white} alt="Company Logo" />
                <h3 href="#home">SEQUIO</h3>
                <div id="form-auth" className="sequio__login-form">

                <form>
                <div className="form-group">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    maxLength="50"
                    placeholder="First Name"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    maxLength="50"
                    placeholder="Last Name"
                  />
                </div>

                <div className="">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="sequio__label-DOB">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>

                <div className="">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    placeholder="Password"
                  />
                  {passwordError && (
                    <div className="error-message">{passwordError}</div>
                  )}
                </div>

                <div className="">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    required
                    placeholder="Confirm Password"
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
                  <p>Register</p>
                </button>
              </form>

              </div>
        </div>
      </div>  
    </>
  );
}

export default SignUpPage;
