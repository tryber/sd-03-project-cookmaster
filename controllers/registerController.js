const registerModel = require('../models/registerModel');

const register = (_req, res) => res.render('admin/register', { message: null });

const registerForm = (req, res) => {
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
  return res.render('admin/register', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  register,
  registerForm,
}
