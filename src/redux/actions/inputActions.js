import * as types from "./actionTypes";

export function setMakeCheckboxValues(makeCheckBox) {
  return { type: types.SET_MAKE_CHECKBOX_VALUES, makeCheckBox };
}

export function getMakeCheckboxValues() {
  return { type: types.GET_MAKE_CHECKBOX_VALUES };
}

export function setYearCheckBoxValues(yearCheckBox) {
  return { type: types.SET_YEAR_CHECKBOX_VALUES, yearCheckBox };
}

export function getYearCheckBoxValues() {
  return { type: types.GET_YEAR_CHECKBOX_VALUES };
}

export function getInputValues() {
  return { type: types.GET_INPUT_VALUES };
}
