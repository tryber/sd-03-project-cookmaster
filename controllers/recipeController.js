const Recipes = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipes.getAll();
  res.render('home', { recipes, user: req.user, message: null });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  res.render('recipe', { recipe, user: req.user, message: null });
};

const searchRecipes = async (req, res) => {
  const recipes = await Recipes.getSearchRecipe(req.query.q);
  res.render('search', { recipes, user: req.user, message: null });
};

module.exports = {
  listRecipes,
  recipeDetail,
  searchRecipes,
};
