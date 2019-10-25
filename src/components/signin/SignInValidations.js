import { isEmpty, isEmail } from "Utils/CommonUtil";

const SignInValidations = (signInData) => {
  let errors = {};

  if (!isEmail(signInData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (isEmpty(signInData.password)) {
    errors.password = "Please enter your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default SignInValidations;