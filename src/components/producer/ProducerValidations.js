import { isEmpty, isEmail, isLength } from "Utils/CommonUtil";

const ProducerValidations = (producerData) => {
  let errors = {};

  if (isEmpty(producerData.legalfirstname)) {
    errors.legalfirstname = "Please enter the legal first name";
  }

  if (isEmpty(producerData.legallastname)) {
    errors.legallastname = "Please enter the legal last name";
  }

  if (isEmpty(producerData.preferredname)) {
    errors.preferredname = "Please enter a preferred name";
  }

  if (isEmpty(producerData.contactphone) || isLength(producerData.contactphone,{min:1,max:13})) {
    errors.contactphone = "Please enter a valid contact phone";
  }

  if (!isEmail(producerData.contactemail)) {
    errors.contactemail = "Please enter a valid email address";
  }

  if (isEmpty(producerData.producerNPN) || isLength(producerData.producerNPN,{min:1,max:7})) {
    errors.producerNPN = "Please enter a valid National Producer Number";
  }

  if (isEmpty(producerData.producerLicenseNumber) || isLength(producerData.producerLicenseNumber,{min:1,max:6})) {
    errors.producerLicenseNumber = "Please enter a valid license number";
  }

  if (isEmpty(producerData.producerLicensedStates)) {
    errors.producerLicensedStates = "Please select the licensed states";
  }

  if (isEmpty(producerData.producerLinesofBusiness)) {
    errors.producerLinesofBusiness = "Please select the lines of businesses";
  }

  if (isEmpty(producerData.producerLicenseRenewalDate)) {
    errors.producerLicenseRenewalDate = "Please select a license renewal date";
  }

  // if (producerData.mode === "edit" && producerData.reasoncode === "SELECT") {
  //   errors.reasoncode = "Please select the deactivation Reason Code";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default ProducerValidations;
