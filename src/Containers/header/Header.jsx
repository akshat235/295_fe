import React from "react";
import './Header.css';
// import people from '../../assests/people.png';
// import ai from '../../assests/ai.png';
import logo from '../../assets/cat_white.png';
import { useNavigate } from "react-router-dom";



function Header() {

    const navigate = useNavigate();
    
    return (
      <div>
        <div className="sequio__header section__padding" id="home">
            <div className="sequio__header-content">
                <img src={logo} alt="logo" />
                <div className="sequio__header-h1">
                    <h1 className="gradient__text">Welcome Jane your personalized Test Prep starts here</h1>
                    <button type="button"  onClick={() => navigate('/user')}><p>Basline Test</p></button>
                </div>
            </div>
        </div>
      </div>
    );
  
  }



export default Header