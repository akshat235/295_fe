import React from "react";
import './StartTest.css';
import { useNavigate } from "react-router-dom";



function BaselineSurvey(){

    const navigate = useNavigate();
    
    return (
      <div>
        <div className="sequio__start-test section__padding" id="home">
            <div className="sequio__start-test-content">
                <button type="button" onClick={() => navigate('/test')}><p>Start Test</p></button>
                <button type="button"><p>See Analysis</p></button>
                <button type="button"><p>Contact Us</p></button>                
            </div>
        </div>
      </div>
    );
  
  }

export default BaselineSurvey