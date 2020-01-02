import carReducer from "./carReducer";
import * as actions from "../actions/carActions";

it("it should add cars when passed SAVE_CAR_SUCCESS", () => {
  const initialState = [
    {
      make: "Ford"
    },
    { make: "Honda" }
  ];
  const newCar = {
    make: "Citroen"
  };

  const action = actions.saveCarSuccess(newCar);

  const newState = carReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].make).toEqual("Ford");
  expect(newState[1].make).toEqual("Honda");
  expect(newState[2].make).toEqual("Citroen");
});

it("it should return list of cars when passed FILTER_CARS_SUCCESS", () => {
  const initialState = [];
  const cars = [
    {
      make: "Ford"
    },
    { make: "Honda" }
  ];
  const action = actions.filterCarsSuccess(cars);
  const newState = carReducer(initialState, action);
  expect(newState.length).toEqual(2);
  expect(newState[0].make).toEqual("Ford");
  expect(newState[1].make).toEqual("Honda");
});

it("should update car when passed UPDATE_CAR_SUCCESS", () => {
  const initialState = [
    { id: 1, make: "Citroen" },
    { id: 2, make: "Ford" },
    { id: 3, make: "Toyota" }
  ];

  const carToUpdate = { id: 2, make: "Honda" };
  const action = actions.updateCarSuccess(carToUpdate);

  const newState = carReducer(initialState, action);
  const updatedCars = newState.find(a => a.id == carToUpdate.id);
  const car_citroen = newState.find(a => a.id == 1);
  const car_toyota = newState.find(a => a.id == 3);

  expect(updatedCars.make).toEqual("Honda");
  expect(car_citroen.make).toEqual("Citroen");
  expect(car_toyota.make).toEqual("Toyota");
  expect(newState.length).toEqual(3);
});

it("should update car when passed UPDATE_CAR_SUCCESS", () => {
  const initialState = [
    { id: 1, make: "Citroen" },
    { id: 2, make: "Ford" },
    { id: 3, make: "Toyota" }
  ];
  const carToDelete = { id: 2, make: "Ford" };
  const action = actions.deleteCarsOptimistic(carToDelete);
  const newState = carReducer(initialState, action);
  expect(newState.length).toEqual(2);
  const ford = newState.find(car => car.make === "Ford");
  expect(!!ford).toEqual(false);
});
