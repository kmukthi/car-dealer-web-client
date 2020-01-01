import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CarsList = ({ cars, showAnnualTotalCost = false, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Make</th>
        <th>Model</th>
        <th>Version</th>
        <th>Year</th>
        <th>Price(€)</th>
        <th>Fuel(km/l)</th>
        <th>Annual maintenance cost(€/year)</th>
        {showAnnualTotalCost && <th>Total annual cost(€/year)</th>}
        {!showAnnualTotalCost && <th />}
      </tr>
    </thead>
    <tbody>
      {cars.map(car => {
        return (
          <tr key={car.id}>
            <td>{car.make}</td>
            <td>
              <Link to={"/car/" + car.id}>{car.model}</Link>
            </td>
            <td>{car.version}</td>
            <td>{car.yearOfManufacture}</td>
            <td>{car.price}</td>
            <td>{car.mileage}</td>
            <td>{car.annualMaintenanceCost}</td>
            {showAnnualTotalCost && <td>{car.totalAnnualCost}</td>}
            {!showAnnualTotalCost && (
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(car)}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  </table>
);

CarsList.propTypes = {
  cars: PropTypes.array.isRequired,
  showAnnualTotalCost: PropTypes.bool,
  onDeleteClick: PropTypes.func.isRequired
};

export default CarsList;
