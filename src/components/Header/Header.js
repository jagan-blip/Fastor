import React, { useState, useEffect } from "react";
import styles from "./Header.css";
import logo from "./fastorlogo.png";
import { NavDropdown, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <li>Restaurants</li>

          <li>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ background: " none", border: "none" }}
              >
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                ></Link>
                User
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </div>
      </div>
    </nav>
  );
};
export default Header;
