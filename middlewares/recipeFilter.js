const recipesModel = require('../models/recipesModel');

const splitIngredientsValues = (string = '') => string.split(',');

const recipeDetailsMiddleware = async (req, _res, next) => {
  try {
    const { id } = req.params;
    const recipeDetails = await recipesModel.findRecipeByID(id);
    const filteredRecipeDetails = await {
      ...recipeDetails,
      ingredients: [...splitIngredientsValues(recipeDetails.ingredients)],
    };

    req.recipeDetails = filteredRecipeDetails;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = recipeDetailsMiddleware;
