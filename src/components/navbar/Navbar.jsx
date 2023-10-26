import React, { useState } from "react";
import "./Navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/cat_white.png";
// BEM -> Block Element Modifier { style of writing the CSS naming convention }

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const Menu = () => (
    <>
      <p>
        <a href="#plans">Plans</a>
      </p>
      <p>
        <a href="#blog">Blog</a>
      </p>
      <p>
        <a href="#about">About</a>
      </p>
      <p>
        <a href="#signout" onClick={() => {navigate("/");
    localStorage.setItem("loggedIn", false)}}>
          Sign Out
        </a>
      </p>
    </>
  );

  const MenuToggle = () => (
    <>
      <p>
        <a href="#plans">Plans</a>
      </p>
      <p>
        <a href="#blog">Blog</a>
      </p>
      <p>
        <a href="#about">About</a>
      </p>
      <p>
        <a href="#signout">Sign Out</a>
      </p>
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
        <Menu />
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
