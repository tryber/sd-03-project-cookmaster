const recipeModel = require('../../models');

const recipeDetails = async (req, res) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);

  const { ingredients } = recipe;

  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  return res.render('recipes', { recipe, user: req.user });
};

module.exports = recipeDetails;
