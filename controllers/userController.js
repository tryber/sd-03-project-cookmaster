const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const Validation = require('../utils/validation');

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

async function singIn(req, res) {
  const info = req.body;
  const { message } = Validation.validadeData(info);
  if (message) {
    return res.render('admin/signin', { message });
  }
  const { error } = await userModel.createUser(info);
  if (!error) {
    return res.render('admin/signin', { message: 'Cadastro efetuado com sucesso!' });
  }
  return undefined;
}

async function editUser(req, res) {
  const { id } = req.user;
  const user = await userModel.findById(id);

  res.render('admin/editUser', { user });
}

async function editUserPOST(req, res) {
  const { user } = req;
  if (!user) { return res.status(401).send('Sai daqui pangaré'); }

  const {
    email, senha, name,
  } = req.body;
  const data = {
    id: user.id, email, password: senha, firstName: name, lastName: req.body.last_name,
  };

  await userModel.updateUser(data);
  return res.redirect('/');
}

module.exports = {
  editUser,
  editUserPOST,
  login,
  loginForm,
  logout,
  singIn,
};
