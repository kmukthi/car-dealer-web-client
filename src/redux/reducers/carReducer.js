import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function carReducer(state = initialState.cars, action) {
  switch (action.type) {
    case types.SAVE_CAR_SUCCESS:
      return [...state, { ...action.car }];
    case types.UPDATE_CAR_SUCCESS:
      return state.map(car => (action.car.id === car.id ? action.car : car));
    case types.RECOMMEND_CARS_SUCCESS:
      return action.cars;
    case types.FILTER_CARS_SUCCESS:
      return action.cars;
    case types.DELETE_CAR_OPTIMISTIC:
      return state.filter(car => car.id !== action.car.id);
    default:
      return state;
  }
}
