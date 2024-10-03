import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/info">Info</Link></li>
        <li><Link to="/user/johndoe">John Doe's Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
