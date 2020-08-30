const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

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

const createUserForm = (_req, res) => res.render('createuser', { message: null });

const createUser = async (req, res) => {
  const {email, password, confirm, first_name, last_name } = req.body;

  if (!regexEmail.test(email))
  return res.render('createuser', {
      message: 'O email deve ter o formato email@mail.com',
    });

  if (password.length < 5)
  return res.render('createuser', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (password !== confirm)
  return res.render('createuser', {
      message: 'As senhas tem que ser iguais',
    });

  if (first_name.length < 2 || typeof first_name !== 'string')
  return res.render('createuser', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  if (last_name.length < 2 || typeof last_name !== 'string')
    return res.render('createuser', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.createUser(email, password, first_name, last_name);
  res.status(201).render('createuser', { message: 'Cadastro efetuado com sucesso!' });
}

module.exports = {
  login,
  loginForm,
  logout,
  createUserForm,
  createUser,
};
