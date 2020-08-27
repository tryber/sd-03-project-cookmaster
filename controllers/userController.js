const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const registerForm = (req, res) => {
  res.render('register', { message: null });
};

const login = async (req, res) => {
  const { email, password, redirect } = req.body;
  if (!email || !password) {
    return res.render('login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password) {
    return res.render('login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

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

const renderRecipes = async (_req, res) => {
  const recipes = await userModel.showAll();
  res.render('home', { recipes, user: null });
};

const renderAdmin = async (req, res) => {
  const recipes = await userModel.showAll();
  return res.render('home', { recipes, user: req.user });
};

const saveUser = (req, res) => {
  const { message } = userModel.saveUserInDB(req.body);
  res.render('register', { message });
};

const showRecipeInfo = async (req, res) => {
  const { id } = req.params;
  const recipeInfo = await userModel.getRecipeInfo(id);
  res.render('recipeInfo', { recipeInfo, user: req.user });
};

const searchRecipe = async (req, res) => {
  const recipes = await userModel.searchByName(req.query.recipeName);
  res.render('search', { recipes });
};

const addRecipe = (_req, res) => {
  res.render('newRecipe');
};

const removeItem = (_req, res) => {
  res.render('newRecipe');
};

const saveNewRecipe = (req, res) => {
  userModel.saveNewRecipeInDB(req.user[0], { ...req.body });
  res.redirect('/');
};

const findRecipeToEdit = async (req, res) => {
  const recipeInfo = await userModel.getRecipeInfo(req.params.id);
  const ingredient = recipeInfo.ingredients.split(',');
  if (req.user[0] !== recipeInfo.userId) return res.redirect('/');
  return res.render('editRecipe', { recipeInfo, ingredient });
};

const editIngredients = async (req, res) => {
  const recipeInfo = await userModel.getRecipeInfo(req.params.id);
  const ingredient = [];
  return res.render('editRecipe', { recipeInfo, ingredient });
};

const updateRecipe = async (req, res) => {
  await userModel.upDateRecipeInDB(req.params.id, req.user[0], { ...req.body });
  res.redirect('/');
};

const showPassConfirm = (req, res) => {
  const { id } = req.params;
  res.render('confirmDelete', { id, message: null });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { message } = await userModel.checkPassword(req.user[0], req.body, id);
  if (message === 'ok') { res.redirect('/'); }
  if (message === 'Senha Incorreta.') { res.render('confirmDelete', { id, message }); }
};

const showMyRecipes = async (req, res) => {
  const recipes = await userModel.showMyRecipesFromDB(req.user[0]);
  res.render('myRecipes', { recipes, user: req.user });
};

module.exports = {
  login,
  loginForm,
  logout,
  renderAdmin,
  renderRecipes,
  registerForm,
  saveUser,
  showRecipeInfo,
  searchRecipe,
  addRecipe,
  saveNewRecipe,
  findRecipeToEdit,
  updateRecipe,
  showPassConfirm,
  deleteRecipe,
  removeItem,
  showMyRecipes,
  editIngredients,
};
