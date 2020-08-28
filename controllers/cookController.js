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

  const test = [await cookModel.getCookieByName(req.query.search)];
  recipes = test;
  return res.render('searchRecipes', { user: req.user, recipes });
};

const lala = [];
const newRecipe = async (_req, res) => {
  return res.render('admin/newRecipe', { lala });
};

const setNewRecipe = async (req, res) => {
  const { remove, name, ingredient, instructions } = req.body;
  if(name.length>0 && ingredient.lenght>0 && instructions.length>0)
  console.log('test')
  if(remove!==undefined)
  lala.splice(remove, 1);
  if(remove===undefined)
  lala.push(ingredient);
  return res.render('admin/newRecipe', { lala });
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
