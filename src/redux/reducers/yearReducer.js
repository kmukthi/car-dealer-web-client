import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function makeReducer(state = initialState.years, action) {
  switch (action.type) {
    case types.LOAD_CAR_YEARS_SUCCESS:
      return action.years;
    case types.DELETE_CAR_OPTIMISTIC:
      return state.filter(
        yearOfManufacture =>
          yearOfManufacture !== action.car.yearOfManufacture.toString()
      );
    default:
      return state;
  }
}
