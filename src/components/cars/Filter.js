import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../common/Checkbox";
import TextInput from "../common/TextInput";

const Filter = ({
  list,
  type,
  label,
  checkboxes,
  onHandleCheck,
  makeSearchField,
  disabled
}) => {
  let modifiedList = list.filter(item =>
    item.toLowerCase().includes(makeSearchField.toLowerCase())
  );

  return (
    <div className="filter-container">
      <strong>{label}</strong>
      <TextInput
        name={type}
        label=""
        value={makeSearchField}
        onChange={onHandleCheck}
        disabled={disabled || list.length === 0}
      />
      <div className="checkbox-container">
        {modifiedList.map(item => {
          return (
            <Checkbox
              name={item}
              label={item}
              isSelected={checkboxes[item]}
              onCheckboxChange={onHandleCheck}
              key={item}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

Filter.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onHandleCheck: PropTypes.func.isRequired,
  checkboxes: PropTypes.object.isRequired,
  makeSearchField: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Filter;
