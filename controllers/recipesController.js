const recipesModel = require('../models/recipesModel');
const rescue = require('express-rescue');

const renderRecipes = rescue(async (_req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  res.render('home', { recipes });
});

module.exports = {
  renderRecipes,
};
