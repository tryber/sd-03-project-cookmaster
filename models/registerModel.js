// Referência REGEX validar e-mail:
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const emailIsValid = (email) => {
  const validEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
  if (validEmail.test(email)) {
    return true;
  }
  return false;
}

const passwordLengthIsValid = (password) => password.length >= 6 ? true : false;

const confirmPasswordIsValid = (password, confirmPassword) =>
  password === confirmPassword ? true : false;

const confirmNameOrLastname = (input) => input.length >= 3 ? true : false;



module.exports = {
  emailIsValid,
  passwordLengthIsValid,
  confirmPasswordIsValid,
  confirmNameOrLastname,
};
