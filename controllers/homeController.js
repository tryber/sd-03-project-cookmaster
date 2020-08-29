const homeModel = require('../models/homeModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();
  console.log(recipes);

  res.render('home', { recipes, user: req.user });
};

const checkById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const recipe = await homeModel.findRecipeById(id);
  console.log(recipe)

  res.render('recipes', { rec: recipe[0], user: req.user })
};

module.exports = {
  listRecipes,
  checkById,
};
