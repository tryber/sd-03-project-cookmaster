const recipeModel = require('../models/recipeModel');

const recipes = async (req, res) => {
  const { user } = req;
  const listRecipes = await recipeModel.getRecipes();
  return res.render('home', { listRecipes, user });
};

module.exports = {
  recipes,
};
