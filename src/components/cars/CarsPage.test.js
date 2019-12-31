import React from "react";
import { shallow } from "enzyme";
import { cars, makes, years } from "../../../tools/mockData";
import { CarsPage } from "./CarsPage";
import Spinner from "../common/Spinner";
import Filter from "./Filter";
import RecommendCarForm from "./RecommendCarForm";
import CarsList from "./CarsList";

function render(args) {
  let makeCheckBox = makes.reduce(
    (options, option) => ({
      ...options,
      [option]: false
    }),
    {}
  );
  let yearCheckBox = years.reduce(
    (options, option) => ({
      ...options,
      [option]: false
    }),
    {}
  );
  const defaultProps = {
    cars,
    makes,
    years,
    loading: false,
    history: {},
    filterCars: jest.fn(),
    getMakes: jest.fn(),
    getYears: jest.fn(),
    getRecommendations: jest.fn(),
    deleteCar: jest.fn(),
    setMakeCheckboxValues: jest.fn(),
    setYearCheckBoxValues: jest.fn(),
    getYearCheckBoxValues: jest.fn(),
    getMakeCheckboxValues: jest.fn(),
    makeCheckBox,
    yearCheckBox,
    match: {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CarsPage {...props} />);
}

it("should have the add button to add new cars", () => {
  const wrapper = render();
  const addBtn = wrapper.find("#add-car-btn").children();
  expect(addBtn.text()).toBe("Add Car");
});

it("should have spinner when loading", () => {
  const wrapper = render({ loading: true });
  const spinnerExists = wrapper.find(Spinner).exists();
  expect(spinnerExists).toBe(true);
});

it("should not have spinner when loading", () => {
  const wrapper = render({ loading: false });
  const spinnerExists = wrapper.find(Spinner).exists();
  expect(spinnerExists).toBe(false);
});

it("should have 2 filter components", () => {
  const wrapper = render({ loading: false });
  const numberOfFilter = wrapper.find(Filter).length;
  expect(numberOfFilter).toBe(2);
});

it("should have 1 recommend form component", () => {
  const wrapper = render({ loading: false });
  const numberOfForm = wrapper.find(RecommendCarForm).length;
  expect(numberOfForm).toBe(1);
});

it("should have car list component", () => {
  const wrapper = render({ loading: false });
  const numberOfList = wrapper.find(CarsList).length;
  expect(numberOfList).toBe(1);
});
