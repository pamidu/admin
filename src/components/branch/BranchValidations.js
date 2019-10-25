import { isEmpty, isEmail, isLength } from "Utils/CommonUtil";

const BranchValidations = (branchData) => {
  let errors = {};

  if (isEmpty(branchData.name)) {
    errors.name = "Please enter your name";
  }

  if (!isEmpty(branchData.branchemail) && !isEmail(branchData.branchemail)) {
    errors.branchemail = "Please enter a valid branch email";
  }

  if (!isEmpty(branchData.branchphone) && isLength(branchData.branchphone,{min:1,max:13})) {
    errors.branchphone = "Please enter your branch phone";
  }

  if (!isEmpty(branchData.contactphone) && isLength(branchData.contactphone,{min:1,max:13})) {
    errors.contactphone = "Please enter your contact phone";
  }

  if (!isEmpty(branchData.contactemail) && !isEmail(branchData.contactemail)) {
    errors.contactemail = "Please enter a valid contact email";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default BranchValidations;
