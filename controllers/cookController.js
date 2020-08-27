const cookModel = require('../models/cookModel');

const listCook = async (_req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('home', { recipes });
};

const newRecipe = async (req, res) => {
  res.render('admin/newRecipe');
};

const cooks = async (req, res) => {
  const recipes = await cookModel.getAll();
  const recipesDetails = recipes.find((el) => el.id === Number(req.params.id));
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
};
