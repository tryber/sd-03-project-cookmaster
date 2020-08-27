const cookModel = require('../models/cookModel');

const listCook = async (_req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('home', { recipes });
};

const searchRecipe = async (req, res) => {
  let recipes;
  recipes = await (cookModel.getAll());
  if (req.query.search === undefined) {
    return res.render('searchRecipes', { user: req.user, recipes });
  }

  if (req.query.search !== undefined) {
    const test = [await cookModel.getCookieByName(req.query.search)];
    recipes = test;
    return res.render('searchRecipes', { user: req.user, recipes });
  }
};

const newRecipe = async (_req, res) => res.render('admin/newRecipe');

const setNewRecipe = async (_req, res) => res.send('ok');

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
