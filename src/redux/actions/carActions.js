import * as types from "./actionTypes";
import * as carApi from "../../api/carApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function saveCarSuccess(car) {
  return { type: types.SAVE_CAR_SUCCESS, car };
}

export function updateCarSuccess(car) {
  return { type: types.UPDATE_CAR_SUCCESS, car };
}

export function filterCarsSuccess(cars) {
  return { type: types.FILTER_CARS_SUCCESS, cars };
}

export function recommendCarsSuccess(cars) {
  return { type: types.RECOMMEND_CARS_SUCCESS, cars };
}

export function getMakesSuccess(makes) {
  return { type: types.LOAD_CAR_MAKES_SUCCESS, makes };
}

export function geYearsSuccess(years) {
  return { type: types.LOAD_CAR_YEARS_SUCCESS, years };
}

export function deleteCarsOptimistic(car) {
  return { type: types.DELETE_CAR_OPTIMISTIC, car };
}

export function saveCar(car) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return carApi
      .saveCar(car)
      .then(savedCar => {
        car.id
          ? dispatch(updateCarSuccess(savedCar))
          : dispatch(saveCarSuccess(savedCar));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function filterCars({ makes, years }) {
  return function(dispatch) {
    dispatch(beginApiCall());
    let param = {
      make: createQueryParams(makes),
      year: createQueryParams(years)
    };
    return carApi
      .getCars(param)
      .then(cars => {
        dispatch(filterCarsSuccess(cars));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function getRecommendations(fuelPrice, distance, { makes, years }) {
  return function(dispatch) {
    dispatch(beginApiCall());
    let param = {
      make: createQueryParams(makes),
      year: createQueryParams(years)
    };
    return carApi
      .getRecommendations(fuelPrice, distance, param)
      .then(cars => {
        dispatch(recommendCarsSuccess(cars));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function getMakes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return carApi
      .getMakes()
      .then(makes => {
        dispatch(getMakesSuccess(makes));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function getYears() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return carApi
      .getYears()
      .then(years => {
        dispatch(geYearsSuccess(years));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteCar(car) {
  return function(dispatch) {
    dispatch(deleteCarsOptimistic(car));
    return carApi.deleteCar(car.id);
  };
}

function createQueryParams(list) {
  let param = "";
  for (let i = 0; i < list.length; i++) {
    param = param + list[i].concat(i < list.length - 1 ? "," : "");
  }
  return param;
}
