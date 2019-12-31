export const SAVE_CAR_SUCCESS = "SAVE_CAR_SUCCESS";
export const UPDATE_CAR_SUCCESS = "UPDATE_CAR_SUCCESS";
export const FILTER_CARS_SUCCESS = "FILTER_CARS_SUCCESS";
export const RECOMMEND_CARS_SUCCESS = "RECOMMEND_CARS_SUCCESS";
export const LOAD_CAR_MAKES_SUCCESS = "LOAD_CAR_MAKES_SUCCESS";
export const LOAD_CAR_YEARS_SUCCESS = "LOAD_CAR_YEARS_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const SET_MAKE_CHECKBOX_VALUES = "SET_MAKE_CHECKBOX_VALUES";
export const SET_YEAR_CHECKBOX_VALUES = "SET_YEAR_CHECKBOX_VALUES";
export const GET_INPUT_VALUES = "GET_INPUT_VALUES";
export const GET_MAKE_CHECKBOX_VALUES = "GET_MAKE_CHECKBOX_VALUES";
export const GET_YEAR_CHECKBOX_VALUES = "GET_YEAR_CHECKBOX_VALUES";
// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_CAR_OPTIMISTIC = "DELETE_CAR_OPTIMISTIC";
