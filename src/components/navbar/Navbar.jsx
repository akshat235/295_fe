import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/cat_white.png";
import AuthContext from "../Auth/AuthContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const disableButton = localStorage.getItem("loggedInTestPage"); 
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const { isTestStarted, setIsTestStarted } = useContext(AuthContext);

  useEffect(() => {


    const handleStorageChange = (e) => {
      if (e.key === "loggedIn") {
        setLoggedIn(e.newValue === "true");
      }

      if( e.key === "isTestStarted") {
        setIsTestStarted(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

  const handleSignOut = (e) => {
      setLoggedIn(false);
      setIsTestStarted(false);
      localStorage.clear()
      navigate("/"); 
  };

  const handleHomeBtn = (e) => {
    setIsTestStarted(false);
    navigate("/starttest")
  };

  const Menu = () => (
    <>
    {isTestStarted ?  <p>
        <a href="#home" onClick={(e) => handleHomeBtn()}>
          Home
        </a>
      </p>
      :null}

    {loggedIn ?  <p>
        <a href="#home" onClick={(e) => handleSignOut()}>
          Sign Out
        </a>
      </p>
      :null}
    </>
  );

  const MenuToggle = () => (
    <>
      {isTestStarted ?  <p>
        <a href="#home" onClick={(e) => handleHomeBtn()}>
          Home
        </a>
      </p>
      :null}
      {loggedIn ? <p>
          <a href="#home" onClick={(e) => handleSignOut()}>
          Sign Out
        </a>
      </p> : null}
    </>
  );

  return (
    <div className="sequio__navbar">
      <div className="sequio__navbar-links">
        <div className="sequio__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sequio__navbar-links_container">
          <p>
            <a href="#home" onClick={() => navigate("/")}>
              SEQUIO
            </a>
          </p>
        </div>
      </div>
      <div className="sequio__navbar-sign">
        {loggedIn ? (<Menu />): null}
      </div>
      <div className="sequio__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="sequio__navbar-menu_container scale-up-center">
            <div className="sequio__navbar-menu_container-links">
              <p>
                <a href="#home">SEQUIO</a>
              </p>
            </div>
            <div className="sequio__navbar-menu_container-links-sign">
              <MenuToggle />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
