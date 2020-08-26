const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const { userModel, recipeModel } = require('../models');

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
  res.redirect(redirect || '/admin');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

async function register(email, password, firstName, lastName) {
  return userModel.registerUser(email, password, firstName, lastName);
}

async function getSelfRecipes(req, res, next) {
  const { id } = req.user;
  const ownRecipes = await recipeModel.getUserRecipesById(id);
  res.status(200).render('', { ownRecipes });
  next();
}

module.exports = {
  login,
  loginForm,
  logout,
  register,
  getSelfRecipes,
};
