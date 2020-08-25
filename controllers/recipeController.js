const recipeModel = require('../models/recipeModel');

async function listRecipes() {
  return recipeModel.getAllWithUsers();
}

async function getRecipeById(urlId) {
  const recipe = await recipeModel.recipesById(urlId);

  return recipe[0];
}

module.exports = {
  listRecipes,
  getRecipeById,
};
