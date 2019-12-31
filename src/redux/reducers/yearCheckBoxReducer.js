import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function yearCheckBoxReducer(
  state = initialState.yearCheckBox,
  action
) {
  switch (action.type) {
    case types.SET_YEAR_CHECKBOX_VALUES:
      return action.yearCheckBox;
    case types.GET_YEAR_CHECKBOX_VALUES:
      return state;
    default:
      return state;
  }
}
