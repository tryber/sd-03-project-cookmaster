const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

// Fonte regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

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
  res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const signupForm = (_req, res) => res.render('signup', { message: null });

const signup = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;

  if (email.length < 5)
    return res.render('signup', {
      message: 'Email incorreto',
    });

  if (password !== passwordConfirm || password.length < 6)
    return res.render('signup', {
      message: 'Senha incorreta',
    });

  if (name.length < 3 || lastName.length < 3)
    return res.render('signup', {
      message: 'Nome ou sobrenome incorretos',
    });

  await userModel.registerUser(email, password, name, lastName);

  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  login,
  loginForm,
  logout,
  signupForm,
  signup,
};
