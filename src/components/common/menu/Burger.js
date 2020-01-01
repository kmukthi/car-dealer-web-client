import React from "react";
import PropTypes from "prop-types";
import "./Burger.less";

const Burger = ({ open = false, onClick, node }) => {
  let wrapperClass = "burger-style";
  if (open) {
    wrapperClass += " " + "open";
  }
  return (
    <div ref={node} className={wrapperClass} onClick={onClick}>
      <div className="first" />
      <div className="second" />
      <div className="third" />
    </div>
  );
};

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  node: PropTypes.object.isRequired
};

export default Burger;
