import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Burger from "./menu/Burger";
import Menu from "./menu/Menu";

const Header = () => {
  const activeStyle = { color: "#FFF" };
  const [open, setOpen] = useState(false);

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, [ref, handler]);
  };

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <nav className="header">
      <NavLink className="left" to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>{" "}
      {" | "}
      <NavLink className="left" to="/cars" exact activeStyle={activeStyle}>
        Cars
      </NavLink>{" "}
      {" | "}
      <NavLink className="left" to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      <Burger node={node} open={open} onClick={handleClick} />
      <Menu open={open} />
    </nav>
  );
};

export default Header;
