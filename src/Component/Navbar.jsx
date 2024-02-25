import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <header>
      <div className="container">
        <div className="navbar">
          <div className="logo">E s l i n t</div>
          <button onClick={() => setActive((prev) => (prev = !prev))}>
            <FaBars />
          </button>
          <ul className={`${active ? "menu" : "none"}`}>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Gallery</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Contacts</a>
            </li>
            <li>
              <a href="">News</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
