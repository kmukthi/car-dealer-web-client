import { combineReducers } from "redux";
import cars from "./carReducer";
import makes from "./makeReducer";
import years from "./yearReducer";
import yearCheckBox from "./yearCheckBoxReducer";
import makeCheckBox from "./makeCheckBoxReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  cars,
  makes,
  years,
  yearCheckBox,
  makeCheckBox,
  apiCallsInProgress
});

export default rootReducer;
