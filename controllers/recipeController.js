const recipeModel = require('../models/recipesModel');

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.getRecipesById(id);

  const arrayOfIngredients = recipe.ingredients.split(',');

  res.render('recipeDetails', {
    ...recipe,
    ingredients: arrayOfIngredients,
    userValidation: req.user,
  });
};

module.exports = {
  recipeDetails,
};
