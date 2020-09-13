const registerModel = require('../models/registerModel');

const registration = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const userValidation = await registerModel.isValidUser(
    email, password, confirmPassword, firstName, lastName,
  );

  if (!userValidation.validation) {
    res.render('cadaster', { ...userValidation });
  }

  await registerModel.registerUser(
    email, password, confirmPassword, firstName, lastName,
  );

  res.render('cadaster', { ...userValidation });
};

const editRegistration = async (req, res) => {
  const { id } = req.user;
  const { email, password, confirmPassword, name, lastName } = req.body;
  
  const { validation } = await registerModel.isValidUser(
    email, password, confirmPassword, name, lastName,
  );

  if (validation) {
    await registerModel.editUser(id, email, password, name, lastName);
    res.redirect('/');
  }
  
  res.render('editUser', { ...req.user });
};

module.exports = {
  registration,
  editRegistration,
};
