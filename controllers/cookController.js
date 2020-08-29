const cookModel = require('../models/cookModel');
const rescue = require('express-rescue');

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

  const test = [await cookModel.getCookieByName(req.query.search)];
  recipes = test;
  return res.render('searchRecipes', { user: req.user, recipes });
};

const lala = [];
const newRecipe = (_req, res) => res.render('admin/newRecipe', { lala: [], name: '' });

const setNewRecipe = rescue(async (req, res) => {
  const { remove, name, ingredient, instructions, save } = req.body;
  if (remove !== undefined) {
    return lala.splice(remove, 1).then(res.render('admin/newRecipe', { lala, name }));
  }
  if (save !== undefined && name.length > 0 && lala.length > 0 && instructions.length > 0) {
    await cookModel.setNewRecipes(req.body, req.user);
    return res.render('admin/newRecipe', { lala: [], name: '' });
  }
  if (remove === undefined && ingredient.length > 0) {
    lala.push(ingredient);
  }
  return res.render('admin/newRecipe', { lala, name });
});

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
