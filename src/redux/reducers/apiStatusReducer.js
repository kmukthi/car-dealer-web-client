import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}
export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  switch (action.type) {
    case actionTypes.BEGIN_API_CALL:
      return state + 1;
    case actionTypes.API_CALL_ERROR:
      return state - 1;
    default: {
      if (actionTypeEndsInSuccess(action.type)) {
        return state - 1;
      }
      return state;
    }
  }
}
