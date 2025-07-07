import React from "react";
import "../styles/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="Diamond Bliss Logo" className="app-logo" />
    </header>
  );
};

export default Header;
