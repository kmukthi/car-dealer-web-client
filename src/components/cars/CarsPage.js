import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  filterCars,
  getMakes,
  getYears,
  getRecommendations,
  deleteCar
} from "../../redux/actions/carActions";
import {
  setMakeCheckboxValues,
  setYearCheckBoxValues,
  getYearCheckBoxValues,
  getMakeCheckboxValues
} from "../../redux/actions/inputActions";
import CarsList from "./CarsList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Filter from "./Filter";
import RecommendCarForm from "./RecommendCarForm";
import { Link } from "react-router-dom";

export function CarsPage({
  cars,
  makes,
  years,
  loading,
  filterCars,
  getMakes,
  getYears,
  getRecommendations,
  deleteCar,
  setMakeCheckboxValues,
  setYearCheckBoxValues,
  getYearCheckBoxValues,
  getMakeCheckboxValues,
  makeCheckBox,
  yearCheckBox
}) {
  const [checkboxes, setCheckboxes] = useState({});
  const [yearCheckboxes, setYearCheckboxes] = useState({});
  const [makeSearchField, setMakeSearchField] = useState("");
  const [yearSearchField, setYearSearchField] = useState("");
  const [errors, setErrors] = useState({});
  const [recommending, setRecommending] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);

  const [recommendCars, setRecommendCars] = useState({
    recommend: false,
    distance: "",
    fuelPrice: ""
  });

  useEffect(() => {
    getYearCheckBoxValues();
    getMakeCheckboxValues();
    getCars(makeCheckBox, yearCheckBox);
    getMakes().catch(error => {
      alert("Loading cars failed" + error);
    });
    getYears().catch(error => {
      alert("Loading cars failed" + error);
    });
  }, []);

  useEffect(() => {
    if (makes.length != 0) {
      const storedMakeCheckboxes = makeCheckBox;
      let temp = makes.reduce(
        (options, option) => ({
          ...options,
          [option]: !!storedMakeCheckboxes[option]
        }),
        {}
      );
      setCheckboxes({ ...temp });
    }
  }, [makes]);

  useEffect(() => {
    if (years.length != 0) {
      const storedYearCheckBox = yearCheckBox;
      let temp = years.reduce(
        (options, option) => ({
          ...options,
          [option]: !!storedYearCheckBox[option]
        }),
        {}
      );
      setYearCheckboxes({ ...temp });
    }
  }, [years]);

  useEffect(() => {
    const disabled = recommendCars.recommend
      ? recommendCars.distance.length === 0 ||
        recommendCars.fuelPrice.length === 0
      : false;
    setFilterDisabled(disabled);
  }, [recommendCars]);

  const getCars = (makes, years) => {
    const filters = getValidFilter(makes, years);
    filterCars({ ...filters }).catch(error => {
      alert("Loading cars failed" + error);
    });
  };

  const getValidFilter = (makes, years) => {
    return {
      makes: Object.keys(makes).filter(i => makes[i] === true),
      years: Object.keys(years).filter(i => years[i] === true)
    };
  };

  const handleMakeCheckBoxChange = changeEvent => {
    if (changeEvent.target.name == "make") {
      const { value } = event.target;
      setMakeSearchField(value);
    } else {
      const { name, checked } = changeEvent.target;

      const updatedMake = {
        ...checkboxes,
        [name]: checked
      };
      setCheckboxes(updatedMake);
      setMakeCheckboxValues(updatedMake);
      if (recommendCars.recommend) {
        if (!formIsValid()) return;
        getRecommendations(recommendCars.distance, recommendCars.fuelPrice, {
          ...getValidFilter(updatedMake, yearCheckboxes)
        });
      } else {
        getCars(updatedMake, yearCheckboxes);
      }
    }
  };

  const handleYearCheckBoxChange = changeEvent => {
    if (changeEvent.target.name == "year") {
      const { value } = event.target;
      setYearSearchField(value);
    } else {
      const { name, checked } = changeEvent.target;

      const updatedYear = {
        ...yearCheckboxes,
        [name]: checked
      };
      setYearCheckboxes(updatedYear);
      setYearCheckBoxValues(updatedYear);
      if (recommendCars.recommend) {
        if (!formIsValid()) return;
        getRecommendations(recommendCars.distance, recommendCars.fuelPrice, {
          ...getValidFilter(checkboxes, updatedYear)
        });
      } else {
        getCars(checkboxes, updatedYear);
      }
    }
  };

  const handleChange = changeEvent => {
    const { name } = changeEvent.target;
    if (name === "recommend") {
      setErrors({});
      const { checked } = event.target;
      setRecommendCars({ ...recommendCars, [name]: checked });
    } else {
      const { value } = event.target;
      setRecommendCars({ ...recommendCars, [name]: value });
    }
  };

  function formIsValid() {
    const { distance, fuelPrice } = recommendCars;
    const errors = {};
    if (!distance) errors.distance = "Distance is required";
    if (!fuelPrice) errors.fuelPrice = "Fuel price is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleRecommend(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setRecommending(true);
    const filters = getValidFilter(checkboxes, yearCheckboxes);
    getRecommendations(recommendCars.distance, recommendCars.fuelPrice, {
      ...filters
    })
      .then(() => {
        toast.success("Recommendations received");
        setRecommending(false);
      })
      .catch(error => {
        setRecommending(false);
        setErrors({ ...errors, onSave: error.message });
      });
  }

  const handleDelete = car => {
    toast.success("Car deleted.");
    deleteCar(car).catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  return (
    <div className="car-page">
      <div className="filter">
        <RecommendCarForm
          recommendCars={recommendCars}
          onHandleCheck={handleChange}
          recommending={recommending}
          errors={errors}
          onRecommend={handleRecommend}
          disabled={cars.length === 0}
        />
        <Filter
          label="Make"
          list={makes}
          type="make"
          onHandleCheck={handleMakeCheckBoxChange}
          checkboxes={checkboxes}
          makeSearchField={makeSearchField}
          disabled={filterDisabled}
        />
        <Filter
          label="Year"
          list={years}
          type="year"
          onHandleCheck={handleYearCheckBoxChange}
          checkboxes={yearCheckboxes}
          makeSearchField={yearSearchField}
          disabled={filterDisabled}
        />
      </div>
      <div className="cars-table">
        <Link id="add-car-btn" to="/car" className="btn btn-primary btn-lg">
          Add Car
        </Link>
        {loading ? (
          <Spinner />
        ) : cars.length === 0 ? (
          <h4>Sorry ! We dont have cars.</h4>
        ) : (
          <CarsList
            cars={cars}
            showAnnualTotalCost={recommendCars.recommend}
            onDeleteClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

CarsPage.propTypes = {
  cars: PropTypes.array.isRequired,

  makes: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  filterCars: PropTypes.func.isRequired,
  getRecommendations: PropTypes.func.isRequired,
  getMakes: PropTypes.func.isRequired,
  getYears: PropTypes.func.isRequired,
  setMakeCheckboxValues: PropTypes.func.isRequired,
  setYearCheckBoxValues: PropTypes.func.isRequired,
  getYearCheckBoxValues: PropTypes.func.isRequired,
  getMakeCheckboxValues: PropTypes.func.isRequired,
  makeCheckBox: PropTypes.object.isRequired,
  yearCheckBox: PropTypes.object.isRequired,
  deleteCar: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  return {
    cars: state.cars,
    years: state.years,
    makes: state.makes,
    loading: state.apiCallsInProgress > 0,
    makeCheckBox: state.makeCheckBox,
    yearCheckBox: state.yearCheckBox
  };
}
const mapDispatchToProps = {
  filterCars,
  getMakes,
  getYears,
  getRecommendations,
  deleteCar,
  setMakeCheckboxValues,
  setYearCheckBoxValues,
  getYearCheckBoxValues,
  getMakeCheckboxValues
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
