const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', {
    recipes,
    message: null,
    user: req.user,
  });
};

module.exports = { showRecipes };
