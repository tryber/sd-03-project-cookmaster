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

const editUserForm = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  return res.render('users/update', {
    message: null,
    user,
  })
};

const editUserPost = async (req, res) => {
  const { email, password, confirm, name, lastName } = req.body;
  const user = await userModel.findById(req.user.id);

  const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const namesTest = /^[a-zA-Z]*$/;

  let arrMessage = []

  if (!email.match(emailTest)) {
    arrMessage = [ ...arrMessage , 'O email deve ter o formato email@mail.com'];
  };

  if (password.length < 6) {
    arrMessage = [ ...arrMessage , 'A senha deve ter pelo menos 6 caracteres'];
  };
  
  if (password !== confirm) {
    arrMessage = [ ...arrMessage , 'As senhas tem que ser iguais'];    
  };

  if (name.length < 3 || !name.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras'];
  }

  if (lastName.length < 3 || !lastName.match(namesTest)) {
    arrMessage = [ ...arrMessage , 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras"'];
  }

  if(arrMessage.length > 0) 
    return res.render('users/update', {
      message: arrMessage,
      user,
    });
  
  await userModel.upadateUser(user.id, email, password, name, lastName);

  return res.redirect('/');
};

module.exports = {
  login,
  loginForm,
  logout,
  editUserPost,
  editUserForm,
};
