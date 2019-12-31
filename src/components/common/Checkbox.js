import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  name,
  label,
  isSelected,
  onCheckboxChange,
  bold = false,
  disabled = false
}) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={name}
        checked={!!isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
        disabled={disabled}
      />
      {bold ? <strong>{label}</strong> : label}
    </label>
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  bold: PropTypes.bool,
  onCheckboxChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Checkbox;
