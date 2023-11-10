import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Header,  SignSignup,  LoginPage,  SignUpPage, Test, User, BaselineSurvey,  StartTest, Dashboard} from "./Components";
import "./App.css";
import { AuthProvider } from "./Components/Auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
       <div className="App">
           <div className="gradient__bg">
                  <Navbar loggedIn={localStorage.getItem("loggedIn")} />
                <Routes>
                  <Route path="/" element={<SignSignup />} />
                  <Route path="/login" element={<LoginPage />}/>
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/header" element={<Header />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/baseline_survey" element={<BaselineSurvey />} />
                  <Route path="/starttest" element={<StartTest/>} />
                  <Route path="/test" element={<Test/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
           </div>
       </div>
    </AuthProvider>
  );
};

export default App;
