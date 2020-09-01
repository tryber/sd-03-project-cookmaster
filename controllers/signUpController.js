const userModel = require('../models/userModel');

const renderSignUp = async (_req, res) => {
  res.render('admin/signUp', {
    emailMessage: null,
    passMessage: null,
    confirmPassMessage: null,
    firstNameMessage: null,
    lastNameMessage: null,
    successMessage: null,
  });
};

const handleEmailMessage = (email) => {
  if (!userModel.emailIsValid(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
  return null;
};

const handlePasswordMessage = (password) => {
  if (!userModel.passwordIsValid(password)) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return null;
};

const handleConfimPasswordMessage = (password, confirmPassword) => {
  if (!userModel.confirmedPassword(password, confirmPassword)) {
    return 'As senhas tem que ser iguais';
  }
  return null;
};

const handleFirstNameMessage = (firstName) => {
  if (!userModel.nameIsValid(firstName)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const handleLastNameMessage = (lastName) => {
  if (!userModel.nameIsValid(lastName)) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const newUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const emailMessage = handleEmailMessage(email);
  const passMessage = handlePasswordMessage(password);
  const confirmPassMessage = handleConfimPasswordMessage(password, confirmPassword);
  const firstNameMessage = handleFirstNameMessage(firstName);
  const lastNameMessage = handleLastNameMessage(lastName);

  if (emailMessage || passMessage || confirmPassMessage || firstNameMessage || lastNameMessage) {
    res.status(402).render('admin/signUp', {
      emailMessage,
      passMessage,
      confirmPassMessage,
      firstNameMessage,
      lastNameMessage,
      successMessage: null,
    });
  }

  await userModel.addUser(email, password, firstName, lastName);

  res.status(201).render('admin/signUp', {
    emailMessage,
    passMessage,
    confirmPassMessage,
    firstNameMessage,
    lastNameMessage,
    successMessage: 'Cadastro efetuado com sucesso!',
  });
};

const renderEditUserForm = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.render('me/edit', {
    user,
    emailMessage: null,
    passMessage: null,
    confirmPassMessage: null,
    firstNameMessage: null,
    lastNameMessage: null,
    successMessage: null,
  });
};

const editUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const emailMessage = handleEmailMessage(email);
  const passMessage = handlePasswordMessage(password);
  const confirmPassMessage = handleConfimPasswordMessage(password, confirmPassword);
  const firstNameMessage = handleFirstNameMessage(firstName);
  const lastNameMessage = handleLastNameMessage(lastName);

  const user = await userModel.findById(req.user.id);

  if (emailMessage || passMessage || confirmPassMessage || firstNameMessage || lastNameMessage) {
    res.status(402).render('me/edit', {
      user,
      emailMessage,
      passMessage,
      confirmPassMessage,
      firstNameMessage,
      lastNameMessage,
      successMessage: null,
    });
  }

  await userModel.updateUser(email, password, firstName, lastName, req.user.id);

  res.redirect('/');
};

module.exports = {
  renderSignUp,
  newUser,
  editUser,
  renderEditUserForm,
};
