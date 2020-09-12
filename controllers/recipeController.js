const Recipes = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipes.getAll();
  res.render('home', { recipes, user: req.user, message: null });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  // if (!recipe) {
  //   return res.status(400).render('recipe', { message: 'Receita não encontrada!'})
  // }
  res.render('recipe', { recipe, user: req.user, message: null });
};

module.exports = {
  listRecipes,
  recipeDetail,
};
