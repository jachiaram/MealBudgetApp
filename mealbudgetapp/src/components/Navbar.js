import React from "react";
import {useRef} from "react";
import {Link} from "react-router-dom";
//import {FaBars, FaTimes} from "react-icons/fa";
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef();
  return (
   <header>
    <h3>Logo</h3>
    <nav ref={navRef}>
        <a href="/">Home</a>
        <Link to="/mylists">My Lists</Link>
        <Link to="/account">Account</Link>
        <Link to="/about">About</Link>
    </nav>
   </header>
  );
};

export default Navbar;