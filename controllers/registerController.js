const registerModel = require('../models/registerModel');

const register = (_req, res) => res.render('admin/register', { message: null });

const registerForm = async (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;
  if (!registerModel.emailIsValid(email)) {
    res.render('admin/register', { message: 'O email deve ter o formato email@mail.com' });
  }
  if (!registerModel.passwordLengthIsValid(password)) {
    res.render('admin/register', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }
  if (!registerModel.confirmPasswordIsValid(password, confirmPassword)) {
    res.render('admin/register', { message: 'As senhas tem que ser iguais' });
  }
  if (!registerModel.confirmNameOrLastname(name)) {
    res.render('admin/register', {
      message:
        'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
  if (!registerModel.confirmNameOrLastname(lastName)) {
    res.render('admin/register', {
      message:
      'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
  await registerModel.createUser(req.body);
  res.render('admin/register', { message: 'Cadastro efetuado com sucesso!' });
};

const editUserInfo = async (req, res) => {
  // const { password, confirmPassword } = req.body;
  const userData = req.body;
  // if (
  //   !registerModel.emailIsValid(userData.email) ||
  //   !registerModel.passwordLengthIsValid(userData.password) ||
  //   !registerModel.confirmPasswordIsValid(userData.password, userData.confirmPassword) ||
  //   !registerModel.confirmNameOrLastname(userData.name) ||
  //   !registerModel.confirmNameOrLastname(userData.lastName)
  // ) res.render('admin/editUserForm', { userData, message: 'Informações inválidas' });
  try {
    await registerModel.updateUserInfo(userData, req.user.id);
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  register,
  registerForm,
  editUserInfo,
};
