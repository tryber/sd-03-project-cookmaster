const registerModel = require('../models/registerModel');

const registration = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const userValidation = await registerModel.isValidUser(
    email, password, confirmPassword, firstName, lastName
  );

  if (!userValidation.validation) {
    res.render('cadaster', { ...userValidation });
  };

  await registerModel.registerUser(
    email, password, confirmPassword, firstName, lastName
  );

  res.render('cadaster', { ...userValidation })
}

module.exports = {
  registration,
};
