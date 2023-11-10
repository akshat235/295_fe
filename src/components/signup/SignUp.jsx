import React, { useState } from "react";
import { useEffect } from "react";
import "./SignUp.css";
import Header from "../header/Header";
import cat_white from "../../assets/cat_white.png";
import { useNavigate } from "react-router-dom";


function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    setIsFormValid(
      !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        firstName &&
        lastName &&
        email &&
        dob
    );
  }, [
    emailError,
    passwordError,
    confirmPasswordError,
    firstName,
    lastName,
    email,
    dob,
  ]);

  const handleLoginEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
  };

  const handleKeyPressValidateEmail = (e) => {
    if (e.key === "Enter") {
      validateEmail();
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
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
        dob: dob,
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
              password: password,
            };

            fetch("https://sequio-mvp-5ecfd4b7501f.herokuapp.com/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login_data),
            })
              .then((response) => {
                let datajson;
                datajson = response.json();
                console.log(datajson);

                if (response.ok) {
                  console.log(datajson.user_data.firstName);
                  localStorage.setItem("loggedIn", true);
                  localStorage.setItem(
                    "userFirstName",
                    datajson.user_data.firstname
                  );
                  localStorage.setItem("userID", datajson.user_data.userId);
                  console.log("Login successful");
                  navigate("/header"); 
                }
              })
              .then(navigate("/header"));
            // localStorage.setItem("userID", data.userName);
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
      <div className="sequio__signup section__padding" id="home">
        <div className="sequio__signup-content">
          <img
            className="sequio__signup-content-img"
            src={cat_white}
            alt="Company Logo"
          />
          <h3 className="sequio__signup-content-h3" href="#home">
            SEQUIO
          </h3>
          <div id="form-auth" className="sequio__signup-form">
            <form className="sequio__signup-form">
              <div className="form-group">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  maxLength="50"
                  placeholder="First Name"
                  className="sequio__signup-form-input"
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
                  className="sequio__signup-form-input"
                />
              </div>

              <div className="">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleLoginEmailChange(e.target.value)}
                  onBlur={validateEmail}
                  required
                  placeholder="Email"
                  onKeyDown={handleKeyPressValidateEmail}
                  className=" sequio__signup-form-input"
                />
                {emailError && (
                  <p className="sequio__signup-form-error-message">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="sequio__label-DOB">
                <label className="sequio__label-DOB-input-label">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="sequio__label-DOB-input"
                />
              </div>

              <div className="">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  placeholder="Password"
                  className="sequio__signup-form-input"
                />
                {passwordError && (
                  <p className="sequio__signup-form-error-message">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  className="sequio__signup-form-input"
                />
                {confirmPasswordError && (
                  <div className="sequio__signup-form-error-message">
                    {confirmPasswordError}
                  </div>
                )}
              </div>
              {errorMsg && (
                <div className="sequio__signup-form-error-message">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                onClick={handleRegister}
                disabled={!isFormValid}
                className={
                  isFormValid
                    ? "sequio__signup-button"
                    : "disabled-button sequio__signup-button"
                }
              >
                <p>Register</p>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <FirstNameContext.Provider value = {firstName}>
        <Header/>
      </FirstNameContext.Provider> */}

    </>
  );
}

export default SignUpPage;
