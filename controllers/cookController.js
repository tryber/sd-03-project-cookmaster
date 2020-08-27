const cookModel = require('../models/cookModel');

const listCook = async (_req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('home', { recipes });
};

const newRecipe = async (_req, res) => {
  res.render('admin/newRecipe');
};

const setNewRecipe = async (req, res) => {
  console.log(req.body)
  res.send('ok')
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
};
