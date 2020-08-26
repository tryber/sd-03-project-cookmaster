const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAll();

  return res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);

  const { ingredients } = recipe;

  const ingredientsArr = ingredients.split(',');

  recipe["ingredients"] = ingredientsArr;

  return res.render('details', { recipe, message: null, user: req.user })
}

module.exports = {
  listRecipes,
  recipeDetails,
};
