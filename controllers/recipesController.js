const recipesModel = require('../models/recipesModel');
const rescue = require('express-rescue');

const renderRecipes = rescue(async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  res.render('home', { recipes, user: req.user });
});

const renderRecipeDetail = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.recipeById(id);

  if (recipe.userId === req.user.id) {
    return res.render('recipeDetail', { recipe, user: req.user, display: true });
  }

  return res.render('recipeDetail', { recipe, user: req.user, display: false });
});

const renderRecipeEdit = rescue(async (req, res) => {
  res.render('recipeEdit', { user: req.user });
});

const renderRecipeDelete = rescue(async (req, res) => {
  res.render('recipeDelete', { user: req.user });
});

const renderRecipeNew = rescue(async (req, res) => {
  res.render('recipeNew', { user: req.user });
});

module.exports = {
  renderRecipes,
  renderRecipeDetail,
  renderRecipeEdit,
  renderRecipeDelete,
  renderRecipeNew,
};
