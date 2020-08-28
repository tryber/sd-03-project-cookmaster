const registerModel = require('../models/registerModel');

const register = (_req, res) => {
  return res.render('admin/register', { message: null });
}

const registerForm = (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;
  if (!registerModel.emailIsValid(email)) {
    return res.render('admin/register', { message: 'O email deve ter o formato email@mail.com'});
  }
  if (!registerModel.passwordLengthIsValid(password)) {
    return res.render('admin/register', { message: 'A senha deve ter pelo menos 6 caracteres'});
  }
  if (!registerModel.confirmPasswordIsValid(password, confirmPassword)) {
    return res.render('admin/register', { message: 'As senhas tem que ser iguais'});
  }
  if (!registerModel.confirmNameOrLastname(name)) {
    return res.render('admin/register', {
      message:
        'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
  }
  if (!registerModel.confirmNameOrLastname(lastName)) {
    return res.render('admin/register', {
      message:
      'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
  }
  return res.render('admin/register', { message:'Cadastro efetuado com sucesso!' });

}

module.exports = {
  register,
  registerForm,
}
