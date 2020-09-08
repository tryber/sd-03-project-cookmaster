const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const queryModel = require('../models/queryModel');

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
  const { redirect } = req.body;
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.redirect(redirect || '/');
};

const registerForm = (_req, res) => res.render('admin/register', {
  message: null,
  redirect: null,
});

const register = async (req, res) => {
  const validation = await userModel.validateUser(req.body);
  if (validation.error) return res.render('admin/register', {
    message: validation.message,
    redirect: null,
  });
  const regisRes = await userModel.createUser(validation);
  return res.render('admin/login', regisRes);
};

const deleteForm = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (parseInt(id, 10) === parseInt(user.id, 10)) {
    return res.render('admin/deleteForm', { message: null, id });
  }
  return res.redirect('/');
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { pass } = req.body;
  const user = req.user;
  const dbUser = await userModel.findById(user.id);
  if (pass !== dbUser.password) {
    return res.render('admin/deleteForm', { message: 'Senha incorreta.', id });
  }
  await queryModel.deleteRecipe(id);
  return res.redirect('/');
};

module.exports = {
  deleteForm,
  deleteRecipe,
  login,
  loginForm,
  logout,
  registerForm,
  register,
};
