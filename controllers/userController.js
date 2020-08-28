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

const regForm = (req, res) => {
  const { token = '' } = req.cookies || {};
  if (SESSIONS[token]) return res.redirect('/login');
  // Se tiver logado, não faz sentido registrar
  return res.render('admin/register', {
    message: 'Cadastre um novo usuário',
    redirect: req.query.redirect,
  });
};

const register = async (req, res) => {
  const { email, pass1, pass2, firstName, lastName } = req.body;
  const response = userModel.valiDate(email, pass1, pass2, firstName, lastName);
  response === true ? // Todos os campos foram validados
  res.status(201).render('userCreated', { message: 'Cadastro efetuado com sucesso!' }) :
  res.status(402).render('admin/register', { message: response })
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
  // Manda o usuário pra home após efetuar o login
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

module.exports = {
  login,
  loginForm,
  register,
  regForm,
  logout,
};
