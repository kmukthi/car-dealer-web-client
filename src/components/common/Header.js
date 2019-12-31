import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#FFF" };
  return (
    <nav className="header">
      <NavLink to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>{" "}
      {" | "}
      <NavLink to="/cars" exact activeStyle={activeStyle}>
        Cars
      </NavLink>{" "}
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
