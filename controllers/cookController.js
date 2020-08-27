const cookModel = require('../models/cookModel');

const listCook = async (_req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('home', { recipes });
};

const searchRecipe = async(_req, res) =>  res.render('searchRecipes');

const newRecipe = async (_req, res) => {
  return res.render('admin/newRecipe');
};

const setNewRecipe = async (_req, res) => {
  return res.send('ok');
};

const cooks = async (req, res) => {
  const { id } = req.params;
  const recipesDetails = await cookModel.getCookieById(id);
  return res.render('recipes', { user: req.user, recipesDetails });
};

const admin = async (req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('admin/home', { user: req.user, recipes });
};

module.exports = {
  listCook,
  newRecipe,
  cooks,
  admin,
  setNewRecipe,
  searchRecipe,
};
