const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    /* baseado em orientação do instrutor Roz
    durante plantão dia 26/08 */
    const recipes = await recipesModel.findAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: null });
  } catch (error) {
    return error;
  }
};

const listRecipeByID = (req, res) => {
  const { recipeDetails, user } = req;

  if (recipeDetails && user) {
    return res.render('recipes/details', { recipeDetails, user });
  }
  return res.render('recipes/details', { recipeDetails, user: null });
};

const listRecipesByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const { user } = req;
    const searchedRecipes = await recipesModel.searchRecipes(q);

    if (user) return res.render('recipes/search', { recipes: searchedRecipes, user });
    return res.render('recipes/search', { recipes: searchedRecipes, user: null });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes, listRecipeByID, listRecipesByQuery };
