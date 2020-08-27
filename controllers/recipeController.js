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
    return res.render('recipeDetails', { recipeDetails, user });
  }
  return res.render('recipeDetails', { recipeDetails, user: null });
};

module.exports = { listRecipes, listRecipeByID };
