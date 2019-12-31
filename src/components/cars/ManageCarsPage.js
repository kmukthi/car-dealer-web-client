import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { filterCars, saveCar } from "../../redux/actions/carActions";
import {
  setMakeCheckboxValues,
  setYearCheckBoxValues
} from "../../redux/actions/inputActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import CarsForm from "./CarsForm";

export function ManageCarsPage({
  cars,
  loading,
  filterCars,
  saveCar,
  history,
  setMakeCheckboxValues,
  setYearCheckBoxValues,
  ...props
}) {
  const [car, setCar] = useState({ ...props.car });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      const filter = {
        makes: [],
        years: []
      };
      filterCars(filter).catch(error => {
        alert("Loading cars failed" + error);
      });
    }
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      setCar({ ...props.car });
    }
  }, [props.car]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCar({
      ...car,
      [name]: value
    });
  }

  function formIsValid() {
    const {
      make,
      model,
      version,
      yearOfManufacture,
      price,
      mileage,
      annualMaintenanceCost
    } = car;
    const errors = {};
    if (!make) errors.make = "Make is required";
    if (!model) errors.model = "Model is required";
    if (!version) errors.version = "Version is required";
    if (!yearOfManufacture)
      errors.yearOfManufacture = "Manufacturing year is required";
    if (!price) errors.price = "Price is required";
    if (!mileage) errors.mileage = "Mileage is required";
    if (!annualMaintenanceCost)
      errors.annualMaintenanceCost = "Annual maintenance cost is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCar(car)
      .then(() => {
        setMakeCheckboxValues({});
        setYearCheckBoxValues({});
        if (car.id) toast.success(car.id ? "Car Updated." : "Car Saved.");
        history.push("/cars");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ ...errors, onSave: error.message });
      });
  }
  return loading ? (
    <Spinner />
  ) : (
    <CarsForm
      car={car}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCarsPage.propTypes = {
  saveCar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  filterCars: PropTypes.func.isRequired,
  cars: PropTypes.array.isRequired,
  car: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setMakeCheckboxValues: PropTypes.func.isRequired,
  setYearCheckBoxValues: PropTypes.func.isRequired
};

function getCarseById(cars, id) {
  return cars.find(car => car.id === parseInt(id) || null);
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const newCar = {
    make: "",
    model: "",
    version: "",
    yearOfManufacture: "",
    price: "",
    mileage: "",
    annualMaintenanceCost: ""
  };
  const car =
    id && state.cars.length > 0 ? getCarseById(state.cars, id) : newCar;
  return {
    car: car,
    cars: state.cars,
    loading: state.apiCallsInProgress > 0
  };
}
const mapDispatchToProps = {
  filterCars,
  saveCar,
  setMakeCheckboxValues,
  setYearCheckBoxValues
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCarsPage);
