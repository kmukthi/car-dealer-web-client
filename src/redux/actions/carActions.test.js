import * as carActions from "./carActions";
import * as types from "./actionTypes";
import { cars } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Cars Thunk", () => {
    it("should create BEGIN_API_CALL and FILTER_CARS_SUCCESS when loading cars", () => {
      fetchMock.mock("*", {
        body: cars,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.FILTER_CARS_SUCCESS, cars }
      ];

      const store = mockStore({ cars: [] });
      const filter = { makes: [], years: [] };
      store.dispatch(carActions.filterCars({ ...filter })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCarsSuccess", () => {
  it("should create a SAVE_CAR_SUCCESS action", () => {
    //arrange
    const car = cars[0];
    const expectedAction = {
      type: types.SAVE_CAR_SUCCESS,
      car
    };

    //act
    const action = carActions.saveCarSuccess(car);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

describe("deleteCarsOptimistic", () => {
  it("should create a DELETE_CAR_OPTIMISTIC action", () => {
    //arrange
    const car = cars[0];
    const expectedAction = {
      type: types.DELETE_CAR_OPTIMISTIC,
      car
    };

    //act
    const action = carActions.deleteCarsOptimistic(car);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
