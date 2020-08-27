const recipesModel = require('../models/recipesModel');

const splitIngredientsValues = (string = '') => string.split(',');

const recipeDetailsMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipeDetails = await recipesModel.findRecipeByID(id);
    const { ingredients } = recipeDetails;

    const filteredRecipeDetails = {
      ...recipeDetails,
      ingredients: [...splitIngredientsValues(ingredients)],
    };

    req.recipeDetails = filteredRecipeDetails;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { recipeDetailsMiddleware };
