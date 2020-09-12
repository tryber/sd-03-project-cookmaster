const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

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
  if (!email || !password) {
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password) {
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

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

const SignUpPage = (req, res) => res.render('signup', { message: null });

const signUp = async (req, res) => {
  const {
    email, password, passwordConfirm, firstName, lastName,
  } = req.body;
  // email validation Regex found at https://www.w3resource.com/javascript/form/email-validation.php
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailValidation = regex.test(email);
  if (!emailValidation) {
    return res.render('signup',
      { message: 'O email deve ter o formato email@mail.com' });
  }

  if (password.length < 6) {
    return res.render('signup',
      { message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (password !== passwordConfirm) {
    return res.render('signup',
      { message: 'As senhas tem que ser iguais' });
  }

  if (firstName.length < 3) {
    return res.render('signup',
      { message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' });
  }

  if (lastName.length < 3) {
    return res.render('signup',
      { message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' });
  }

  await userModel.createUser(email, password, firstName, lastName);

  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  login,
  loginForm,
  logout,
  SignUpPage,
  signUp,
};
