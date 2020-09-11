const Recipes = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipes.getAll();
  res.render('home', { recipes, user: req.user, message: null });
};

module.exports = {
  listRecipes,
};
