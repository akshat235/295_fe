import React from "react";
import './BaselineSurvey.css';
import { useNavigate } from "react-router-dom"; 


function BaselineSurvey() {
  
const navigate = useNavigate();

  return(<div><div className="sequio__baseline-survey section__padding" id="home">
  <div className="sequio__baseline-survey-content">
  <h3 href="#home">Let us get to know you</h3>
      <input type="text" className="sequio__baseline-survey-content-input" placeholder="Age" />
      <input type="text" className="sequio__baseline-survey-content-input" placeholder="Years of Experience" />
      <p className="sequio__baseline-survey-content-input-p">Are you attempting CAT for the first time?</p>
      <ul className="sequio__test-content__grid-container-options">
          <li className="sequio__baseline-survey-content-input-li">
          <input
              type="radio"
              name="options"
              className="sequio__baseline-survey-content-li-input"
          />
              <h3>Yes</h3>
          </li>
          <li className="sequio__baseline-survey-content-input-li">
              <input
                  type="radio"
                  name="options"
                  className="sequio__baseline-survey-content-li-input"
              />  
              <h3>No</h3>
          </li>
      </ul>
      <input type="text" className="sequio__baseline-survey-content-input" placeholder="Current Position" />
      <input type="number" className="sequio__baseline-survey-content-input" placeholder="Pincode" />
      <input type="number" className="sequio__baseline-survey-content-input" placeholder="average annum income(self/guardian) in Rs" />
      <button type="button" className="sequio__baseline_surveyt-btns" onClick={() => navigate('/starttest')}><p>Start Test </p></button>
      {/* <button type="button"><p>SAT</p></button> */}
      
  </div>
</div></div>)
        
};

export default BaselineSurvey;