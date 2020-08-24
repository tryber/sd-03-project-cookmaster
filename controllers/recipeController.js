const recipeModel = require('../models/recipeModel');

async function listRecipes() {
  return recipeModel.getAllWithUsers();
}

module.exports = {
  listRecipes,
};
