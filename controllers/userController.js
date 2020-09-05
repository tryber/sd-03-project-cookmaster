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
  // Se estiver logado, não faz sentido registrar
  return res.render('admin/register', { message: 'Teste' });
};

const register = async (req, res) => {
  const { email, password, password_conf, first_name, last_name } = req.body; // Vem do form
  const response = userModel.valiDate(email, password, password_conf, first_name, last_name);
  if ( response === true ) { // Todos os campos foram validados
    await userModel.create(email, password, first_name, last_name);
    res.status(201).render('admin/userCreated', { message: 'Cadastro efetuado com sucesso!' });
  } else {
    res.status(402).render('admin/register', { message: response });
  }
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
