const recipeModel = require('../models/recipeModel');

const recipeList = async (_req, res) => {
  const recipes = await recipeModel.getRecipeList();
  return res.render('home', { recipes });
};

module.exports = {
  recipeList,
};
