const homeModel = require('../models/homeModel');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const checkById = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);

  res.render('recipes/recipes', { rec: recipe[0], user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  const searched = await homeModel.findRecipeByQuery(q);

  if (searched) res.render('recipes/search', { searched, user: req.user });
  res.render('recipes/search', { user: req.user });
};

const newRecipe = async (req, res) => {
  res.render('recipes/new', { user: req.user });
};

const saveRecipe = async (req, res) => {
  console.log(req.body, req.user);


};

module.exports = {
  listRecipes,
  checkById,
  searchRecipe,
  newRecipe,
  saveRecipe,
};
