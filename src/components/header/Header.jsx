import React, { useState, useEffect } from "react";
import "./Header.css";
// import people from '../../assests/people.png';
// import ai from '../../assests/ai.png';
import logo from "../../assets/cat_white.png";
import { useNavigate } from "react-router-dom";
import ai from "../../assets/Group 1.png";
import { TailSpin } from "react-loader-spinner";



function Header() {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userFirstName = localStorage.getItem("userFirstName");
    setTimeout(() => {
      const userFirstName = localStorage.getItem("userFirstName");
    }, 1000);

    localStorage.setItem("loggedInTestPage", false);
    if (userFirstName) {
      setTimeout(() => {
        setFirstName(userFirstName);
      }, 500);
      
    } else {
      setFirstName("");
    }
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, []);
  const navigate = useNavigate();

  return (
    // <div>
    //   <div className="sequio__header section__padding" id="home">
    //       <div className="sequio__header-content">
    //           <img src={logo} alt="logo" />
    //           <div className="sequio__header-h1">
    //               <h1 className="gradient__text">Welcome {firstName} your personalized Test Prep starts here</h1>
    //               <button type="button"  onClick={() => navigate('/user')}><p>Basline Test</p></button>
    //           </div>
    //       </div>
    //   </div>
    // </div>
    <>
      {loading ? (
        <TailSpin color="#040C18" radius={"4px"} />
      ) : (
        <div className="sequio__header2 section__padding2" id="home">
          <div className="sequio__header secstion__padding" id="home">
            <div className="sequio__header-content">
              <h1 className="gradient__text fade-in ">
                Welcome {firstName ? (firstName) : ("User")  } your personalized Test Prep starts here
              </h1>
              <button
                type="button"
                className="sequio__header-btns"
                onClick={() => navigate("/baseline_survey")}
              >
                <p>Take a Test</p>
              </button>
            </div>
            <div className="sequio__header-image">
              <img src={ai} alt="ai" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
