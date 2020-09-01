const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

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

const signupForm = (_req, res) => res.render('signup', { message: null });
const signup = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;
  // Ao se cadastrar um email inválido deverá aparecer a mensagem
  // "O email deve ter o formato email@mail.com".
  if (!regexEmail.test(email))
    res.render('signup', {
      message: 'O email deve ter o formato email@mail.com',
    });

  // Ao se cadastrar uma senha inválida deverá aparecer a mensagem
  // "A senha deve ter pelo menos 6 caracteres".
  if (password.length < 5)
    res.render('signup', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  // Ao se inserir um "confirmar senha" inválido, deverá aparecer a mensagem
  // "As senhas tem que ser iguais".
  if (password !== passwordConfirm)
    res.render('signup', {
      message: 'As senhas tem que ser iguais',
    });

  // Ao se cadastrar um nome inválido, deverá aparecer a mensagem
  // "O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras".
  if (name.length < 2 || typeof name !== 'string')
    res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  // Ao cadastar um sobrenome inválido deverá aparecer a mensagem
  // "O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras".
  if (lastName.length < 2 || typeof lastName !== 'string')
    res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  await userModel.registerUser(email, password, name, lastName);
  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

const editUser = async (req, res) => {
  const { email, password, name, lastName } = req.body;
  await userModel.editUser(req.user.id, email, password, name, lastName);
  return res.redirect('/');
};

const editUserForm = async (req, res) => {
  const userInfos = await userModel.findById(req.user.id);
  return res.render('admin/userEdition', { userInfos, message: null, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  signupForm,
  editUser,
  editUserForm,
};
