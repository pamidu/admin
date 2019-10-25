import { isEmpty, isEmail, isLength } from "Utils/CommonUtil";

const AgencyValidations = (agencyData) => {
  let errors = {};

  if (isEmpty(agencyData.legalName)) {
    errors.legalName = "Please enter the legal name";
  }

  if (isEmpty(agencyData.doingBusinessAs)) {
    errors.doingBusinessAs = "Please enter the business";
  }

  if (isEmpty(agencyData.employerIdentificationNumber) || isLength(agencyData.employerIdentificationNumber,{min:1,max:9})) {
    errors.employerIdentificationNumber = "Please enter the valid employer identification number";
  }

  if (isEmpty(agencyData.licenseNumber) || isLength(agencyData.licenseNumber,{min:1,max:6})) {
    errors.licenseNumber = "Please enter a valid license number";
  }

  if (isEmpty(agencyData.licensedStates)) {
    errors.licensedStates = "Please enter the licensed states";
  }

  if (isEmpty(agencyData.lineOfBusiness)) {
    errors.lineOfBusiness = "Please enter the line of business";
  }

  if (isEmpty(agencyData.licenseRenewalDate)) {
    errors.licenseRenewalDate = "Please enter the license renewal date";
  }

  if (isEmpty(agencyData.corporateAddress)) {
    errors.corporateAddress = "Please enter the corporate address";
  }

  if (isEmpty(agencyData.corporatePhone) || isLength(agencyData.corporatePhone,{min:1,max:13})) {
    errors.corporatePhone = "Please enter the valid corporate phone";
  }
  
  if (isEmpty(agencyData.producerPhoneNumber) || isLength(agencyData.producerPhoneNumber,{min:1,max:13})) {
    errors.producerPhoneNumber = "Please enter the valid producer phone";
  }

  if (!isEmail(agencyData.corporateEmail)) {
    errors.corporateEmail = "Please enter a valid corporate email address";
  }

  if (isEmpty(agencyData.contactPersonName)) {
    errors.contactPersonName = "Please enter the contact person's name";
  }

  if (isEmpty(agencyData.contactPersonPhone) || isLength(agencyData.contactPersonPhone,{min:1,max:13})) {
    errors.contactPersonPhone = "Please enter the contact person's phone number";
  }

  if (!isEmail(agencyData.contactPersonEmail)) {
    errors.contactPersonEmail = "Please enter a valid email address";
  }

  if (isEmpty(agencyData.legalfirstname)) {
    errors.legalfirstname = "Please enter the legal first name";
  }

  if (isEmpty(agencyData.legallastname)) {
    errors.legallastname = "Please enter the legal last name";
  }

  if (isEmpty(agencyData.superUserContactName)) {
    errors.superUserContactName = "Please enter the super user's contact name";
  }

  if (!isEmail(agencyData.superUserEmail)) {
    errors.superUserEmail = "Please enter a valid email address";
  }
  if (isEmpty(agencyData.producerNPN) || isLength(agencyData.producerNPN,{min:1,max:7})) {
    errors.producerNPN = "Please enter the valid national producer number";
  }

  if (isEmpty(agencyData.producerLicenseNumber) || isLength(agencyData.producerLicenseNumber,{min:1,max:6})) {
    errors.producerLicenseNumber = "Please enter a valid license number";
  }

  if (isEmpty(agencyData.producerLicensedStates)) {
    errors.producerLicensedStates = "Please enter the licensed states";
  }

  if (isEmpty(agencyData.producerLinesofBusiness)) {
    errors.producerLinesofBusiness = "Please enter the lines of business";
  }

  if (isEmpty(agencyData.producerLicenseRenewalDate)) {
    errors.producerLicenseRenewalDate = "Please enter the license renewal date";
  }

  if (isEmpty(agencyData.agencyManagementSystem)) {
    errors.agencyManagementSystem = "Please enter the agency management system";
  }

  // if (agencyData.mode === "edit" && agencyData.deactivationInitiator === "SELECT") {
  //   errors.deactivationInitiator = "Please select the deactivation initiator";
  // }

  // if (agencyData.mode === "edit" && agencyData.deactivationReasonCode === "SELECT") {
  //   errors.deactivationReasonCode = "Please select the deactivation Reason Code";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default AgencyValidations;
