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

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};  // based on https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const onlyLetters = (string) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(string);
};  // based on https://www.w3resource.com/javascript/form/all-letters-field.php

const register = async (req, res) => {
  const { email, password, confirmPassword, name, lastName } = req.body;

  switch (true) {
    case (!validateEmail(email)):
      return res.render('admin/register', { message: 'O email deve ter o formato email@mail.com' });
    case (password.length < 6):
      return res.render('admin/register', { message: 'A senha deve ter pelo menos 6 caracteres' });
    case (password !== confirmPassword):
      return res.render('admin/register', { message: 'As senhas tem que ser iguais' });
    case (name.length < 3 || !onlyLetters(name)):
      return res.render('admin/register', {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    case (lastName.length < 3 || !onlyLetters(lastName)):
      return res.render('admin/register', {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
    default:
      await userModel.addUser(email, password, name, lastName);
      return res.render('admin/register', { message: 'Cadastro efetuado com sucesso!' });
  }
};

const rendEditUser = async (req, res) => {
  res.render('admin/edit-user', { user: req.user, message: null });
};

const editUser = async (req, res) => {
  const { id } = req.user;
  const { email, password, firstName, lastName } = req.body;
  await userModel.updateUser(id, email, password, firstName, lastName);
  res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  register,
  rendEditUser,
  editUser,
};
