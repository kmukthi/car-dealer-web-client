import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function makeReducer(state = initialState.makes, action) {
  switch (action.type) {
    case types.LOAD_CAR_MAKES_SUCCESS:
      return action.makes;
    case types.DELETE_CAR_OPTIMISTIC:
      return state.filter(make => make !== action.car.make);
    default:
      return state;
  }
}
