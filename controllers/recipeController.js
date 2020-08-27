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

const listRecipeByID = async (req, res) => {
  try {
    const { recipeDetails, user } = req;

    if (recipeDetails && user) {
      return res.render('details', { recipeDetails, user });
    }
    return res.render('details', { recipeDetails, user: null });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes, listRecipeByID };
