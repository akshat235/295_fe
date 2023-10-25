import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

import {  Header,  SignSignup,  SignUpForm,  LoginForm, Test, User, BaselineSurvey,  StartTest, Dashboard} from "./Containers";
import { Navbar } from "./components";
import "./App.css";
import LoginPage from "./Containers/login/Login";
import SignUpPage from "./Containers/signup/SignUp";

const App = () => {
  return (
    //    <div className="App">
    //        <div className="gradient__bg">
    //            <Navbar />
    //            <SignSignup/>
    //            <LoginForm />
    //            <SignUpForm />
    //            <Header />
    //            <User/>
    //            <BaselineSurvey />
    //            <StartTest />
    //        </div>
    //    </div>

    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<SignSignup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/user" element={<User />} />
        <Route path="/baseline_survey" element={<BaselineSurvey />} />
        <Route path="/starttest" element={<StartTest/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
