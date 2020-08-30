const homeModel = require('../models/homeModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const checkById = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);

  res.render('recipes/recipes', { rec: recipe[0], user: req.user })
};

const searchRecipe = async (req, res) => {

  res.render('recipes/search', { user: req.user });
};

module.exports = {
  listRecipes,
  checkById,
  searchRecipe,
};
