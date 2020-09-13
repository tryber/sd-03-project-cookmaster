const recipesModel = require('../models/recipesModel');

const getAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  getAllRecipes,
};
