const recipesModel = require('../models/recipesModel');
const rescue = require('express-rescue');

const renderRecipes = rescue(async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  res.render('home', { recipes, user: req.user });
});

const renderRecipeDetail = rescue(async (req, res) => {
  const { id } = req.params;
  
  const recipe = await recipesModel.recipeById(id);
  res.render('recipeDetail', { recipe, user: req.user });
});

module.exports = {
  renderRecipes,
  renderRecipeDetail,
};
