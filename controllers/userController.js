const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

// const idController = async (req) => {
//   const { name, ingredientList, steps } = req.body;
//   console.log(name, ingredientList, steps)
// };

const formSubmit = async (req, res) => {
  const { email, password, checkPassword, name, lastName, redirect } = req.body;
  if (password !== checkPassword) {
    return res.render('cadastro', {
      message: 'Senha não confere',
      redirect: null,
    });
  }
  const user = await userModel.findByEmail(email);
  if (user)
    return res.render('cadastro', {
      message: 'Email já cadastrado',
      redirect: null,
    });
  await userModel.createUser(email, password, name, lastName);
  res.redirect(redirect || '/');
};

const loginForm = async (req, res) => {
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
  if (!user || user.pass !== password)
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

module.exports = {
  login,
  loginForm,
  logout,
  formSubmit,
};
