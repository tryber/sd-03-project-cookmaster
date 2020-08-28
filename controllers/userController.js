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
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const signup = async (req, res) => {
  res.clearCookie('token');
  const { email, password, confirmPassword, name, lastName } = req.body;
  if(name.length < 3)
    return res.render('admin/signup', { redirect: null, message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' });

  if(lastName.length < 3)
    return res.render('admin/signup', { redirect: null, message: 'O segundo  nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' });

  if(password.length < 6 )
    return res.render('admin/signup', { redirect: null, message: 'A senha deve ter pelo menos 6 caracteres' });

  if(password !== confirmPassword)
    return res.render('admin/signup', { redirect: null, message: 'As senhas tem que ser iguais' });

  /* if (!insertValidation(email, password, confirmPassword, name, lastName)) {
    return res.render('admin/signup', {
      message: 'Erro ao realizar cadastro.',
      redirect: null,
    });
  } */

  await userModel.insertUser(email, password, name, lastName);

  return res.status(201).render('admin/signup', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
  });
  

};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
};
