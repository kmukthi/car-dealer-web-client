import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/car/";

export function saveCar(car) {
  const id = car.id;
  return fetch(baseUrl + (id || ""), {
    method: id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(car)
  })
    .then(handleResponse)
    .catch(handleError);
}

const createEndPoint = param => {
  let endpoint = "";
  if (param.make != "" && param.year != "") {
    endpoint = "?make=" + param.make + "&year=" + param.year;
  } else if (param.make != "") {
    endpoint = "?make=" + param.make;
  } else if (param.year != "") {
    endpoint = "?year=" + param.year;
  }
  return endpoint;
};

export function getCars(param) {
  const endpoint = createEndPoint(param);

  return fetch(baseUrl + "getByYearAndMake" + endpoint)
    .then(handleResponse)
    .catch(handleError);
}

export function getRecommendations(fuelPrice, distance, param) {
  const endpoint = createEndPoint(param);
  return fetch(baseUrl + "findRanking/" + fuelPrice + "/" + distance + endpoint)
    .then(handleResponse)
    .catch(handleError);
}

export function getMakes() {
  return fetch(baseUrl + "make/")
    .then(handleResponse)
    .catch(handleError);
}

export function getYears() {
  return fetch(baseUrl + "years/")
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCar(carId) {
  return fetch(baseUrl + carId, { method: "DELETE" }).catch(handleError);
}
