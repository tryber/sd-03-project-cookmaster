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

const login = async (req, res, _next) => {
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

const signup = (_req, res) => {
  res.render('signup', { message: null });
};

// Ideia do Willy!
const errorMessages = {
  invalidEmail: 'O email deve ter o formato email@mail.com',
  smallPassword: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  nameRules: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastNameRules: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  success: 'Cadastro efetuado com sucesso!',
};

const userSignUp = async (req, res) => {
  const { email, password, confirmPassword, name, lastname } = req.body;
  // console.log(req.body);
  if (!userModel.validateEmail(email)) {
    res.render('signup', { message: errorMessages.invalidEmail });
  }

  if (password.length < 6) {
    res.render('signup', { message: errorMessages.smallPassword });
  }

  if (password !== confirmPassword) {
    res.render('signup', { message: errorMessages.confirmPassword });
  }

  if (name.length < 3) res.render('signup', { message: errorMessages.nameRules });

  if (lastname < 3) res.render('signup', { message: errorMessages.lastNameRules });

  await userModel.insertUser(email, password, name, lastname);
  res.render('signup', { message: errorMessages.success });
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  userSignUp,
};
