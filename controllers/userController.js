const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const rescue = require('express-rescue');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const registerForm = (_req, res) =>
  res.render('admin/register', { message: null });

const validateEmail = (email, res) => {
  if (!email || !email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/))
    res.render('admin/register', {
      message: 'O email deve ter o formato email@mail.com',
    });
};

const validatePassword = (password, passwordV, res) => {
  if (!password || password.length < 6)
    res.render('admin/register', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (!passwordV || String(password) !== String(passwordV))
    res.render('admin/register', {
      message: 'As senhas tem que ser iguais',
    });
};

const validateName = (name, res) => {
  if (!name || !name.match(/^[a-zA-Z]{3,}$/))
    res.render('admin/register', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
};

const validateLastName = (lastName, res) => {
  if (!lastName || !lastName.match(/^[a-zA-Z]{3,}$/))
    res.render('admin/register', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
};

const register = rescue(async (req, res) => {
  const { email, password, passwordV, name, lastName } = req.body;

  validateEmail(email, res);
  validatePassword(password, passwordV, res);
  validateName(name, res);
  validateLastName(lastName, res);

  await userModel.createUser({ email, password, passwordV, name, lastName });

  res.render('admin/register', { message: 'Cadastro efetuado com sucesso!' });
});

const renderEditUser = (req, res) =>
  res.render('admin/edit', { message: null, user: req.user });

const editUser = rescue(async (req, res) => {
  const { email, password, passwordV, name, lastName } = req.body;
  const { id } = req.user;

  await userModel.editUser({ id, email, password, passwordV, name, lastName });

  res.redirect('/');
});

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

module.exports = {
  login,
  loginForm,
  logout,
  registerForm,
  register,
  renderEditUser,
  editUser,
};
