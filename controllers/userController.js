const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');
const RecipeModel = require('../models/recipeModel');

// Formulário de login
const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

// Formulário de registro
const regForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  return SESSIONS[token] ? res.redirect('/login'): // Se estiver logado, não faz sentido registrar
  res.render('admin/register', { message: 'Digite seus dados de cadastro' });
};

// Formulário de edição de usuário
const editUserForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  return ! SESSIONS[token] ? res.redirect('/login'): // Só faz sentido editar se estiver logado
  res.render('admin/edit', { user: req.user, message: 'Digite seus novos dados de usuário' });
};

// Ação de registrar usuário
const register = async (req, res) => {
  const { email, password, password_conf, first_name, last_name } = req.body; // Vêm do form
  const response = userModel.valiDate(email, password, password_conf, first_name, last_name);
  if (response === true) {
    await userModel.create(email, password, first_name, last_name);
    res.status(201).render('admin/userCreated', { message: 'Cadastro efetuado com sucesso!' });
  } else {
    res.status(402).render('admin/register', { message: response });
  }
};

// Ação de atualizar usuário
const update = async (req, res) => {
  const { email, password, passwordConf, firstName, lastName } = req.body; // Vem do form
  const { id } = req.user;

  const response = userModel.valiDate(email, password, passwordConf, firstName, lastName);
  if (response === true) {
    await userModel.update(id, req.body);
    const recipes = await RecipeModel.getAllRecipes();
    res.status(201).render('home', { user: req.user, recipes });
  } else {
    res.status(402).render('admin/edit', { message: response });
  }
};

// Ação de logar no sistema
const login = async (req, res) => {
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

// Ação de sair do sistema
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
  editUserForm,
  update,
  logout,
};
