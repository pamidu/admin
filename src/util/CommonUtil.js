import Validator from 'validator';

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
};

export const setOnlyAlpha = (value) => {  
  return value.replace(/[^a-zA-Z\s]/g, "");
};

export const setOnlyLiterals = (value) => {
  return value.replace(/[^a-zA-Z0-9\s]/g, '')
}

export const setOnlyDigit = (value) => {  
  return value.replace(/\D/g, "");
};

export const isEmail = value => {
  return Validator.isEmail(value);
};

export const isZipCode = (value, locale) => {  
  return Validator.isPostalCode(value, locale);
};

export const filterOnlyNumbers = (value) => {  
  return value.replace(/\D+/g, '').trim();
};

export const isLength = (value, options) => {  
  return Validator.isLength(value, options);
};

export const isAtLeastOneNumber = value => {
  let regex = /(?=.*\d)/;
  
  return regex.test(value);
};

export const isAtLeastOneLowerCase = value => {
  let regex = /(?=.*[a-z])/;
  
  return regex.test(value);
};

export const isAtLeastOneUpperCase = value => {
  let regex = /(?=.*[A-Z])/;
  
  return regex.test(value);
};

export const setSSNFormat = (value) => {  
  let val = value.replace(/\D/g, '');
  let newVal = '';

  if(val.length > 4) {
    value = val;
  }
  if((val.length > 3) && (val.length < 6)) {
      newVal += val.substr(0, 3) + '-';
      val = val.substr(3);
  }
  if (val.length > 5) {
      newVal += val.substr(0, 3) + '-';
      newVal += val.substr(3, 2) + '-';
      val = val.substr(5);
  }
  newVal += val;
  return newVal;
};

export const setPhoneFormat = (value) => {  
  let val = value.replace(/\D/g, '');
  let newVal = '';

  if(val.length > 4) {
    value = val;
  }
  if((val.length > 3) && (val.length < 7)) {
      newVal += '(' + val.substr(0, 3) + ') ';
      val = val.substr(3);
  }
  if (val.length > 6) {
      newVal += '(' + val.substr(0, 3) + ') ';
      newVal += val.substr(3, 3) + '-';
      val = val.substr(6);
  }
  newVal += val;
  return newVal;
};

export const setEINFormat = (value) => {  
  let val = value.replace(/\D/g, '');
  let newVal = '';

  if((val.length > 2) && (val.length < 10)) {
    newVal += val.substr(0, 2) + '-';
    val = val.substr(2);
  }
  newVal += val;
  return newVal;
};

export const setCurrencyFormat = (value) => {  
  let val = value.replace(/\D/g, '');
  let newVal = '';

  if((val.length > 0)) {
      newVal += '$ ' + val.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return newVal;
};

export const setDrivingLicenseFormat = (value) => {  
  // return value.replace(/[^A-z0-9\s]/g, '');
  let patt = "^(S\d{8}|SA\d{7})$"
  return setOnlyLiterals(value.replace(patt));
};
