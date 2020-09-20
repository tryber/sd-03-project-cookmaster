const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

// Usando a mesma referência da anagomesC
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/LoginPage', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/LoginPage', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/LoginPage', {
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
  res.render('admin/LogoutPage');
};

const signupForm = (_req, res) => res.render('SignupPage', { message: null });

const signup = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;

  if (!regexEmail.test(email))
    res.render('SignupPage', {
      message: 'O email deve ter o formato email@mail.com',
    });

  if (password.length < 5)
    res.render('SignupPage', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (password !== passwordConfirm)
    res.render('SignupPage', {
      message: 'As senhas tem que ser iguais',
    });

  if (name.length < 2 || typeof name !== 'string')
    res.render('SignupPage', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  if (lastName.length < 2 || typeof lastName !== 'string')
    res.render('SignupPage', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.registerUser(email, password, name, lastName);

  res.status(201).render('SignupPage', { message: 'Cadastro efetuado com sucesso!' });
};

const editUserForm = async (req, res) => {
  const userInfos = await userModel.findById(req.user.id);

  return res.render('admin/EditUser', { userInfos, message: null, user: req.user });
};

const editUser = async (req, res) => {
  const { email, password, name, lastName } = req.body;

  await userModel.editUser(req.user.id, email, password, name, lastName);

  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  signupForm,
  signup,
  editUserForm,
  editUser,
};
