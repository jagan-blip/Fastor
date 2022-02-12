import React, { useState, useEffect } from "react";
import styles from "./Header.css";
import logo from "./fastorlogo.png";
const Header = () => {
  const [check, setCheck] = useState(false);
  return (
    <nav>
      <div className="menu">
        <input type="checkbox" id="check"></input>
        <div className="brand">
          <img src={logo} id="logo"></img>

          <i className="fa-solid fa-user"></i>
        </div>
        <div className="burger" onClick={(state) => setCheck(!check)}>
          <label htmlFor="check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="items_1">
          <li>About us</li>
          <li>Contact us</li>
          <li>
            {" "}
            <i className="fas fa-user"></i> Create account
          </li>
        </div>
      </div>
    </nav>
  );
};
export default Header;
