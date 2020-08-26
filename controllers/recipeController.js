const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAll();

  return res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);

  const { ingredients } = recipe;

  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  return res.render('details', { recipe, message: null, user: req.user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: null, message: null, user: req.user, value: null });

  const recipes = await recipeModel.findRecipesByQuery(q);
  console.log(recipes);
  return res.render('search', { recipes, message: null, user: req.user, value: q });
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipes,
};
