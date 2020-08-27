const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', {
    recipes,
    message: null,
    user: req.user,
  });
};

const showOneRecipe = async (req, res) => {
  const recipe = await recipeModel.getRecipeById(req.params.id);
  res.render('details', {
    recipe,
    message: null,
    user: req.user,
  });
};

module.exports = { showRecipes, showOneRecipe };
