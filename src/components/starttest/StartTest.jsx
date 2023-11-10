import React from "react";
import './StartTest.css';
import { useNavigate } from "react-router-dom";

function BaselineSurvey(){

    const navigate = useNavigate();
    localStorage.setItem("dashboardPage", false);
    
    return (
      <div>
        <div className="sequio__start-test section__padding" id="home">
            <div className="sequio__start-test-content">
                <button className="sequio__start-test-content-button" type="button" onClick={() => navigate('/test')}><p>Start Test</p></button>
                <button  className="sequio__start-test-content-button"  type="button" onClick={() => navigate('/dashboard')}><p>See Analysis</p></button>
                <a href="https://sequio.ai/contact.html">   <button  className="sequio__start-test-content-button" type="button"><p>Contact Us</p></button>          </a>      
                <a href="https://sequio.ai/about.html">   <button  className="sequio__start-test-content-button" type="button"><p>About Sequio</p></button>          </a>      
            </div>
        </div>
      </div>
    );
  
  }

export default BaselineSurvey