const registerModel = require('../models/registerModel');

const registerForms = (_req, res) => res.render('register', { message: null });

const register = async (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;
  const messageArr = registerModel.newUserIsValid(email, password, confirmPassword, name, lastName);

  if (messageArr.length > 0) return res.render('register', { message: messageArr });

  await registerModel.addUser(email, password, name, lastName);

  messageArr.push('Cadastro efetuado com sucesso!');
  return res.render('register', { message: messageArr });
};

module.exports = {
  registerForms,
  register,
};
