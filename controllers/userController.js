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
  return res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.render('admin/logout');
};

const registry = async (req, res) => {
  if (req.body && req.validate) {
    const { email, password, name, lastName } = req.body;
    await userModel.createUser(email, password, name, lastName);
    return res.render('admin/signup', {
      message: req.message,
      redirect: null,
    });
  }

  return res.render('admin/signup', {
    message: req.message || null,
    redirect: null,
  });
};

const validatePassword = async (req, _res, next) => {
  const { password } = req.body;
  const { id } = req.user;
  try {
    const userData = await userModel.findById(id);
    if (userData.password === password) {
      req.validatePassword = true;
    } else {
      req.validatePassword = false;
    }
    return next();
  } catch (error) {
    return error;
  }
};

const updateUserPage = async (req, res) => {
  const { user } = req;
  const { id } = user;

  // Para comparação de id de usuário logado com autor da receita
  const checkUser = await userModel.findById(id);
  try {
    if (user && checkUser.id === id) {
      return res.render('admin/editProfile', {
        message: null,
        user: checkUser,
      });
    }
    return res.status(401).send('Acesso Negado');
  } catch (error) {
    return error;
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const checkUser = await userModel.findById(id);
  if (req.body && req.validate) {
    const { email, password, name, lastName } = req.body;
    await userModel.updateUser(id, email, password, name, lastName);
    return res.redirect('/admin');
  }

  return res.render('admin/editProfile', {
    message: req.message || null,
    user: checkUser,
  });
};

module.exports = {
  login,
  loginForm,
  logout,
  registry,
  validatePassword,
  updateUserPage,
  updateUser,
};
