const recipesModel = require('../models/recipesModel');

const showAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.findAllRecipes();
    return res.render('home', { recipes, user: req.user || null });
  } catch (error) {
    return error;
  }
};

const showRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.findRecipeById(id);
    return recipe ? res.render('recipe', { recipe, user: req.user || null })
      : res.status(404).render('notFound');
  } catch (error) {
    return error;
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    const recipes = await recipesModel.findRecipesByName(q);
    if (!q) return res.render('search', { recipes: null, user: req.user || null });

    return res.render('search', { recipes, user: req.user || null });
  } catch (error) {
    return error;
  }
};

const newRecipe = async (req, res) => {
  const {
    id: userId,
    name: userName,
  } = req.user;
  const {
    recipeName = null,
    ingredients = null,
    instructions = null,
  } = req.body;

  const newRecipe = recipesModel.newRecipe(
    userId,
    userName,
    recipeName,
    ingredients,
    instructions,
  );

  if (newRecipe) return res.status(200).redirect('/');
};

module.exports = {
  showAllRecipes,
  showRecipeDetails,
  searchRecipes,
  newRecipe,
};
