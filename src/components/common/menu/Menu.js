import React from "react";
import PropTypes from "prop-types";
import "./Menu.less";
import { Link } from "react-router-dom";
const Menu = ({ open }) => {
  let wrapperClass = "menu-style";
  if (open) {
    wrapperClass += " " + "open";
  }
  return (
    <div className={wrapperClass}>
      <table className="table">
        <tbody>
          <tr>
            <td className="drop-down-list-container">
              <Link to="/car">
                <div className="plus-container">
                  <div className="horizontal"></div>
                  <div className="vertical"></div>
                </div>

                <div className="text">Add Car</div>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
Menu.propTypes = {
  open: PropTypes.bool
};
export default Menu;
