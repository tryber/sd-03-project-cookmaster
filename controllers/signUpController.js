const userModel = require('../models/userModel');

const renderSignUp = async (_req, res) => {
  res.render('admin/signUp', {
    emailMessage: null,
    passwordMessage: null,
    confirmPasswordMessage: null,
    firstNameMessage: null,
    lastNameMessage: null,
    successMessage: null,
  });
};

const newUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  let emailMessage = null;
  let passwordMessage = null;
  let confirmPasswordMessage = null;
  let firstNameMessage = null;
  let lastNameMessage = null;

  if (!userModel.emailIsValid(email)) {
    emailMessage = 'O email deve ter o formato email@mail.com';
  }

  if (!userModel.passwordIsValid(password)) {
    passwordMessage = 'A senha deve ter pelo menos 6 caracteres';
  }

  if (!userModel.confirmedPassword(password, confirmPassword)) {
    confirmPasswordMessage = 'As senhas tem que ser iguais';
  }

  if (!userModel.nameIsValid(firstName)) {
    firstNameMessage =
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (!userModel.nameIsValid(lastName)) {
    lastNameMessage = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (emailMessage || passwordMessage || confirmPasswordMessage || firstNameMessage || lastNameMessage) {
    console.log('passei aqui')
    res.status(402).render('admin/signUp', {
      emailMessage,
      passwordMessage,
      confirmPasswordMessage,
      firstNameMessage,
      lastNameMessage,
      successMessage: null,
    });
  }

  await userModel.addUser(email, password, firstName, lastName);

  res.status(201).render('admin/signUp', {
    emailMessage,
    passwordMessage,
    confirmPasswordMessage,
    firstNameMessage,
    lastNameMessage,
    successMessage: 'Cadastro efetuado com sucesso!',
  });
};

module.exports = {
  renderSignUp,
  newUser,
};
