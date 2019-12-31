import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as carActions from "./actions/carActions";

it("should handle creating car", () => {
  //arrange
  const store = createStore(rootReducer, initialState);
  const car = {
    make: "Ford"
  };
  //act
  const action = carActions.saveCarSuccess(car);
  store.dispatch(action);

  //assert
  const createdCar = store.getState().cars[0];
  expect(createdCar).toEqual(car);
});

it("should handle updating car", () => {
  //arrange
  const store = createStore(rootReducer, initialState);
  const car = {
    make: "Ford"
  };
  //act
  const action = carActions.saveCarSuccess(car);
  store.dispatch(action);
  const createdCar = store.getState().cars[0];

  createdCar.make = "Update_Ford";
  const updateAction = carActions.updateCarSuccess(createdCar);
  store.dispatch(updateAction);

  //assert
  const updatedCar = store.getState().cars[0];
  expect(updatedCar.make).toEqual("Update_Ford");
});

it("should handle listing all cars", () => {
  const store = createStore(rootReducer, initialState);
  const cars = [
    { make: "Ford" },
    { make: "Toyota" },
    { make: "Citroen" },
    { make: "Honda" }
  ];
  const action = carActions.filterCarsSuccess(cars);
  store.dispatch(action);
  const retrievedCars = store.getState().cars;
  expect(retrievedCars.length).toEqual(4);
  expect(retrievedCars[0].make).toEqual("Ford");
  expect(retrievedCars[1].make).toEqual("Toyota");
  expect(retrievedCars[2].make).toEqual("Citroen");
  expect(retrievedCars[3].make).toEqual("Honda");
});

it("should handle recommending cars", () => {
  const store = createStore(rootReducer, initialState);
  const cars = [
    { make: "Ford" },
    { make: "Toyota" },
    { make: "Citroen" },
    { make: "Honda" }
  ];
  const action = carActions.recommendCarsSuccess(cars);
  store.dispatch(action);
  const retrievedCars = store.getState().cars;
  expect(retrievedCars.length).toEqual(4);
  expect(retrievedCars[0].make).toEqual("Ford");
  expect(retrievedCars[1].make).toEqual("Toyota");
  expect(retrievedCars[2].make).toEqual("Citroen");
  expect(retrievedCars[3].make).toEqual("Honda");
});

it("should handle retrieving makes", () => {
  const store = createStore(rootReducer, initialState);
  const cars = ["Ford", "Toyota", "Citroen", "Honda"];
  const action = carActions.getMakesSuccess(cars);
  store.dispatch(action);
  const retrievedCars = store.getState().makes;
  expect(retrievedCars.length).toEqual(4);
  expect(retrievedCars[0]).toEqual("Ford");
  expect(retrievedCars[1]).toEqual("Toyota");
  expect(retrievedCars[2]).toEqual("Citroen");
  expect(retrievedCars[3]).toEqual("Honda");
});

it("should handle retrieving years", () => {
  const store = createStore(rootReducer, initialState);
  const cars = [2000, 2001, 2002, 2004];
  const action = carActions.geYearsSuccess(cars);
  store.dispatch(action);
  const retrievedCars = store.getState().years;
  expect(retrievedCars.length).toEqual(4);
  expect(retrievedCars[0]).toEqual(2000);
  expect(retrievedCars[1]).toEqual(2001);
  expect(retrievedCars[2]).toEqual(2002);
  expect(retrievedCars[3]).toEqual(2004);
});

it("should handle deleting cars", () => {
  const store = createStore(rootReducer, initialState);
  const carToDelete = { id: 1, make: "Ford" };
  const cars = [
    carToDelete,
    { id: 2, make: "Toyota" },
    { id: 3, make: "Citroen" },
    { id: 4, make: "Honda" }
  ];
  const action = carActions.filterCarsSuccess(cars);
  store.dispatch(action);

  const retrievedCars = store.getState().cars;
  expect(retrievedCars.length).toEqual(4);

  const deleteAction = carActions.deleteCarsOptimistic(carToDelete);
  store.dispatch(deleteAction);
  const retrievedCarsAfterDelete = store.getState().cars;
  expect(retrievedCarsAfterDelete.length).toEqual(3);
});
