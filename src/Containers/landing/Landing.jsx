import React from "react";
import "./Landing.css";
import logo from "../../assets/cat_white.png";
import { useNavigate } from 'react-router-dom';




function Landing() {

    const navigate = useNavigate();
    
    return (
        <div className="sequio__landing section__padding" id="home">
        <div className="sequio__landing-content">
          <img src={logo} alt="logo" />
          <h3 href="#home">SEQUIO</h3>
          <button type="button" className="sequio__signin-btn" onClick={() => navigate('login')} >
            <p>Log In</p>
          </button>
          <button type="button" className="sequio__signup-btn">
            <p>Sign Up</p>
          </button>
        </div>
      </div>
    );
  
  }



export default Landing;
