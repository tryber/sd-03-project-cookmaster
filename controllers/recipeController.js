const recipeModel = require('../models/recipeModel');

const recipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeList();
  return res.render('home', { recipes, token: req.user });
};

module.exports = {
  recipeList,
};
