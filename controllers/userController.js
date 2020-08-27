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

const signupForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/signup', {
    message: null,
    redirect: req.query.redirect,
  });
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const validString = (value) => !/^[a-zA-Z]+$/.test(value)

const signup = async (req, res, next) => {
  const { email, password, confirmPassword, name, lastName } = req.body;
  if (!email || !password || !confirmPassword || !name || !lastName)
  return res.render('admin/signup', {
    message: 'Preencha todos os dados',
    redirect: null,
  });

  if (!emailRegex.test(email))
  return res.render('admin/signup', {
    message: 'O email deve ter o formato email@mail.com',
    redirect: null,
  });

  if (password.length < 6)
  return res.render('admin/signup', {
    message: 'A senha deve ter pelo menos 6 caracteres',
    redirect: null,
  });

  if (password !== confirmPassword)
  return res.render('admin/signup', {
    message: 'As senhas tem que ser iguais',
    redirect: null,
  });

  if (name.length < 3 || validString(name))
  return res.render('admin/signup', {
    message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    redirect: null,
  });

  if (lastName.length < 3 || validString(lastName))
  return res.render('admin/signup', {
    message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    redirect: null,
  });

  await userModel.setUser(req.body);
  const user = await userModel.findByEmail(email);
  if (user)
  return res.render('admin/signup', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

module.exports = {
  login,
  loginForm,
  signup,
  signupForm,
  logout,
};
