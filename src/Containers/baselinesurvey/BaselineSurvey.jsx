import React from "react";
import './BaselineSurvey.css';
import { useNavigate } from "react-router-dom"; 

function BaselineSurvey(){

    const navigate = useNavigate();
    
    return (
      <div>
        <div className="sequio__baseline-survey section__padding" id="home">
            <div className="sequio__baseline-survey-content">
            <h3 href="#home">Let us get to know you</h3>
                <input type="text" placeholder="Age" />
                <input type="text" placeholder="Years of Experience" />
                <input type="text" placeholder="First time attempting CAT Y/N?" />
                <button type="button" onClick={() => navigate('/starttest')}><p>CAT</p></button>
                <button type="button" onClick={() => navigate('/starttest')}><p>SAT</p></button>
                
            </div>
        </div>
      </div>
    );
  
  }



export default BaselineSurvey