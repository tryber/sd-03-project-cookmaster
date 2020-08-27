const recipeModel = require('../models/recipeModel');

const listRecipes = async (_req, res) => {
  const recipes = await recipeModel.getAllRecipes();

  res.render('home', { recipes, message: null });
};

module.exports = {
  listRecipes
};
