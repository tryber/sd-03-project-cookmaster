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

const login = async (req, res) => {
  const { email, password, redirect } = req.body;

  if (!email || !password) return res.render('admin/login', { message: 'Preencha o email e a senha', redirect: null });

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
  return res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');

  if (!req.cookies || !req.cookies.token) return res.redirect('/login');

  return res.render('admin/logout');
};

// REGISTER

const registerForm = (_req, res) => { res.render('admin/signup', { message: null }); };

const registerUser = async (req, res) => {
  const {
    email,
    password,
    passconfirm,
    firstName,
    lastName,
  } = req.body;

  let validation = userModel.isValidTwo(email, firstName, lastName);

  if (validation !== undefined) {
    return res.render('admin/signup', {
      message: {
        validation,
      },
    });
  }

  validation = await userModel.isValid(email, password, passconfirm, firstName, lastName);

  return res.render('admin/signup', {
    message: {
      validation,
    },
  });
};

// Edition

const userEditForm = (req, res) => {
  const idUser = req.user;
  return res.render('admin/edit', {
    message: null,
    email: null,
    idUser,
  });
};

const userEdit = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const idUser = req.user;

  await userModel.updateUser(idUser.id[0], email, password, firstName, lastName);

  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,

  // Register
  registerUser,
  registerForm,

  // Edition
  userEdit,
  userEditForm,

};
