const recipeModel = require('../models/recipeModel');

const recipesAuth = async ({ user }, res) => {
  const allRecipes = await recipeModel.getNames();
  return res.render('home', { allRecipes, user });
};

module.exports = {
  recipesAuth,
};