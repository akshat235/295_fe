import React from "react";
import './User.css';
import { useNavigate } from "react-router-dom";


function User(){

    const navigate = useNavigate();
    
    return (
        <div className="sequio__user section__padding" id="home">
        <div className="sequio__user-content">
            <h3 href="#home">Join as a</h3>
            <button type="button"  onClick={() => navigate('/baseline_survey')}><p>Learner</p></button>
            <button type="button" onClick={() => navigate('/baseline_survey')}><p>Parent</p></button>
            <button type="button" onClick={() => navigate('/baseline_survey')}><p>Administrator</p></button>
        </div>
    </div>
    );
}


export default User