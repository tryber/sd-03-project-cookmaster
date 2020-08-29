const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();

  res.status(200).render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return res.status(404).render('recipes/notFound');

  return res.status(200).render('recipes/recipeDetail', { recipe, user: req.user });
};

const renderSearch = async (req, res) => {
  const { q } = req.query;

  if (!q && q !== '') {
    res.status(200).render('recipes/search', { recipes: null, user: req.user });
  }

  const recipes = await recipeModel.findRecipeByName(q);

  try {
    res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
  } catch (e) {
    console.error(e);
  }

};

module.exports = {
  listRecipes,
  recipeDetails,
  renderSearch,
};
