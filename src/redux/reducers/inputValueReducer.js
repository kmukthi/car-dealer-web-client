import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function inputValueReducer(state = initialState.input, action) {
  switch (action.type) {
    case types.SET_MAKE_CHECKBOX_VALUES:
      return { ...state, makeCheckBox: action.makeCheckbox };
    case types.SET_YEAR_CHECKBOX_VALUES:
      return { ...state, yearCheckBox: action.yearCheckBox };
    case types.GET_INPUT_VALUES:
      return state;
    default:
      return state;
  }
}
