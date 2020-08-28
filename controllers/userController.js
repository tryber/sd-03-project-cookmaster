const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const createUserModel = require('../models/createUserModel');

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

const signup = (_req, res) => {
  res.render('signup', { message: null });
};

const errorMessages = {
  emailinvalido: 'O email deve ter o formato email@mail.com',
  senhapequena: 'A senha deve ter pelo menos 6 caracteres',
  senhaigual: 'As senhas tem que ser iguais',
  primeironome: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  segundonome: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  sucesso: 'Cadastro efetuado com sucesso!',
};

const createUser = async (req, res) => {
  const { email, senha, confirmarsenha, nome, sobrenome } = req.body;
  const validaEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!validaEmail.test(email)) res.render('signup', { message: errorMessages.emailinvalido });

  if (senha.length < 6) res.render('signup', { message: errorMessages.senhapequena });

  if (senha !== confirmarsenha) res.render('signup', { message: errorMessages.senhaigual });

  if (nome.length < 3) res.render('signup', { message: errorMessages.primeironome });

  if (sobrenome.length < 3) res.render('signup', { message: errorMessages.segundonome });
  
  await createUserModel.userCreate(email, senha, nome, sobrenome);
  return res.render('signup', { message: errorMessages.sucesso });
};

module.exports = {
  login,
  loginForm,
  logout,
  signup,
  createUser,
};
