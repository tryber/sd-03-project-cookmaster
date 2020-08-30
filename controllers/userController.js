const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

// Referência regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexEmail = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

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

const registerForm = (_req, res) => res.render('register', { message: null });

const informMessage = {
  cadastro: 'Cadastro efetuado com sucesso!',
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
};

const registerUser = async (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;

  if (!regexEmail.test(email)) {
    await res.render('register', { message: informMessage.email });
  }

  if (password.length < 5) {
    await res.render('register', { message: informMessage.password });
  }

  if (confirmPassword !== password) {
    await res.render('register', { message: informMessage.confirmPassword });
  }

  if (name.length < 3 && typeof name === 'string') {
    await res.render('register', { message: informMessage.name });
  }

  if (lastName.length < 3) {
    await res.render('register', { message: informMessage.lastName });
  }

  await userModel.createUser(email, password, name, lastName);
  return res.status(200).render('register', { message: informMessage.cadastro });
};

module.exports = {
  login,
  loginForm,
  logout,
  registerUser,
  registerForm,
};
