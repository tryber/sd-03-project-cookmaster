const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    /* baseado em orientação do instrutor Roz
    durante plantão dia 26/08 */
    const recipes = await recipesModel.findAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('recipeDetails', { recipes, user: null });
  } catch (error) {
    return error;
  }
};

const listRecipeByID = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDetails = await recipesModel.findRecipeByID(id);
    if (req.user) return res.render('home', { recipeDetails, user: req.user });
    return res.render('recipeDetails', { recipeDetails, user: null });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes, listRecipeByID };
