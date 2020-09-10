const Recipes = require('../models/recipeModel');

const listRecipes = async (_req, res) => {
  const recipes = await Recipes.getAll();
  res.render('home', { recipes, message: null });
};

module.exports = {
  listRecipes,
};
