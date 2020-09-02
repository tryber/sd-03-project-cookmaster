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

const registerForm = (req, res) =>
  res.render('admin/register', {
    message: null,
    redirect: req.query.redirect,
  });

const register = rescue(async (req, res) => {
  const { email, password, passwordV, name, lastName } = req.body;

  if (!email || !email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/))
    return res.render('admin/register', {
      message: 'O email deve ter o formato email@mail.com',
      redirect: null,
    });

  if (!password || password.length < 6)
    return res.render('admin/register', {
      message: 'A senha deve ter pelo menos 6 caracteres',
      redirect: null,
    });

  if (!passwordV || String(password) !== String(passwordV))
    return res.render('admin/register', {
      message: 'As senhas tem que ser iguais',
      redirect: null,
    });

  if (!name || !name.match(/^[a-zA-Z]{3,}$/))
    return res.render('admin/register', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });

  if (!lastName || !lastName.match(/^[a-zA-Z]{3,}$/))
    return res.render('admin/register', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      redirect: null,
    });

  await userModel.createUser({ email, password, passwordV, name, lastName });

  res.render('admin/register', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
  });
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
};
