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

// email validation Regex found at https://www.w3resource.com/javascript/form/email-validation.php
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const signUp = async (req, res) => {
  const { email, password, passwordConfirm, firstName, lastName } = req.body;

  if (!regex.test(email)) {
    res.render('signup',
      { message: 'O email deve ter o formato email@mail.com' });
  }
  if (password.length < 6) {
    res.render('signup', { message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (password !== passwordConfirm) {
    res.render('signup', {
      message: 'As senhas tem que ser iguais',
    });
  }
  if (firstName.length < 3) {
    res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }

  if (lastName.length < 3) {
    res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }

  await userModel.createUser(email, password, firstName, lastName);
  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

const editUserPage = async (req, res) => res.render('editUser', { user: req.user });

const editUser = async (req, res) => {
  const { id } = req.user;
  const { email, password, firstName, lastName } = req.body;
  await userModel.editUser(id, email, password, firstName, lastName);
  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  SignUpPage,
  signUp,
  editUserPage,
  editUser,
};
