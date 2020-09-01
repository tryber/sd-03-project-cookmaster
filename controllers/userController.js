const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const utils = require('./utils');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, _next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = async (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const registerUser = async (req, res) => {
  const { email, password, confirm_password, name, lastName } = req.body;
  console.log('email', '-', email, '-');
  switch (true) {
    case !utils.validateEmail(email):
      return res.render('register', { message: 'O email deve ter o formato email@mail.com' });
    case password.length < 6:
      return res.render('register', { message: 'A senha deve ter pelo menos 6 caracteres' });
    case password !== confirm_password:
      return res.render('register', { message: 'As senhas tem que ser iguais' });
    case name.length < 3:
      return res.render('register', {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    case lastName.length < 3:
      return res.render('register', {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    default:
  }
  await userModel.registerUser(email, password, name, lastName);
  return res.render('register', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  login,
  loginForm,
  logout,
  registerUser,
};
