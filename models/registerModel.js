const connection = require('./connection');

// Referência REGEX validar e-mail:
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const emailIsValid = (email) => {
  const validEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
  if (validEmail.test(email)) {
    return true;
  }
  return false;
};

const passwordLengthIsValid = (password) => (password.length >= 6 ? 1 : 0);

const confirmPasswordIsValid = (password, confirmPassword) => (
  password === confirmPassword ? 1 : 0
);

const confirmNameOrLastname = (input) => (input.length >= 3 ? 1 : 0);

const updateUserInfo = ({ email, password, name, lastName }, id) =>
  connection()
    .then((db) => db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });

module.exports = {
  emailIsValid,
  passwordLengthIsValid,
  confirmPasswordIsValid,
  confirmNameOrLastname,
  updateUserInfo,
};
