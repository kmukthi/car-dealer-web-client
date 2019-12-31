import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function makeCheckBoxReducer(
  state = initialState.makeCheckBox,
  action
) {
  switch (action.type) {
    case types.SET_MAKE_CHECKBOX_VALUES:
      return action.makeCheckBox;
    case types.GET_MAKE_CHECKBOX_VALUES:
      return state;
    default:
      return state;
  }
}
