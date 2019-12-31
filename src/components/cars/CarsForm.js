import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import NumberInput from "../common/NumberInput";

const CarsForm = ({ car, onChange, onSave, saving = false, errors = {} }) => {
  return (
    <form className="cars-from" onSubmit={onSave}>
      <h2>{car.id ? "Edit" : "Add"} Car</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="make"
        label="Make"
        value={car.make}
        onChange={onChange}
        error={errors.make}
      />

      <TextInput
        name="model"
        label="Model"
        value={car.model}
        onChange={onChange}
        error={errors.model}
      />

      <TextInput
        name="version"
        label="Version"
        value={car.version}
        onChange={onChange}
        error={errors.version}
      />

      <NumberInput
        name="yearOfManufacture"
        label="Manufactured year"
        value={car.yearOfManufacture.toString()}
        onChange={onChange}
        error={errors.yearOfManufacture}
      />

      <NumberInput
        name="price"
        label="Price"
        value={car.price.toString()}
        onChange={onChange}
        error={errors.price}
      />

      <NumberInput
        name="mileage"
        label="Mileage"
        value={car.mileage.toString()}
        onChange={onChange}
        error={errors.mileage}
      />

      <NumberInput
        name="annualMaintenanceCost"
        label="Annual Maintenance Cost"
        value={car.annualMaintenanceCost.toString()}
        onChange={onChange}
        error={errors.annualMaintenanceCost}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving
          ? car.id
            ? "Updating"
            : "Saving..."
          : car.id
          ? "Update"
          : "Save"}
      </button>
    </form>
  );
};

CarsForm.propTypes = {
  car: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CarsForm;
