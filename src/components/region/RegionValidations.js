import { isEmpty } from "Utils/CommonUtil";

const RegionValidations = (regionData) => {
  let errors = {};

  if (isEmpty(regionData.name)) {
    errors.name = "Please enter the name of the region";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default RegionValidations;
