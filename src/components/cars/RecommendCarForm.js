import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../common/Checkbox";
import NumberInput from "../common/NumberInput";

const RecommendCarForm = ({
  onRecommend,
  onHandleCheck,
  recommendCars,
  errors = {},
  recommending = false,
  disabled = false
}) => {
  return (
    <form className="filter-container" onSubmit={onRecommend}>
      <Checkbox
        name="recommend"
        label="Recommend"
        isSelected={recommendCars.recommend}
        onCheckboxChange={onHandleCheck}
        bold={true}
      />
      <NumberInput
        name="distance"
        label="Distance to Travel in a month"
        value={recommendCars.distance}
        onChange={onHandleCheck}
        error={errors.distance}
        disabled={!recommendCars.recommend}
      />
      <NumberInput
        name="fuelPrice"
        label="Fuel price per litre"
        value={recommendCars.fuelPrice}
        onChange={onHandleCheck}
        error={errors.fuelPrice}
        disabled={!recommendCars.recommend}
      />
      <button
        type="submit"
        disabled={recommending || disabled}
        className="btn btn-primary"
      >
        {recommending ? "Recommending..." : "Recommend"}
      </button>
    </form>
  );
};

RecommendCarForm.propTypes = {
  onHandleCheck: PropTypes.func.isRequired,
  recommendCars: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onRecommend: PropTypes.func.isRequired,
  recommending: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RecommendCarForm;
