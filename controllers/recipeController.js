const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAll();

  res.render('home', { recipes, message: null, user: req.user });
};

module.exports = {
  listRecipes,
};
