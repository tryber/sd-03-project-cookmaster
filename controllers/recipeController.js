const recipeModel = require('../models/recipeModel');

async function listRecipes() {
  return recipeModel.getAllWithUsers();
}

async function recipeDetails(req, res) {
  const recipesList = await recipeModel.recipesById(req.params.id);
  const { instructions, name, ingredients, userRecipeId } = recipesList[0];
  const { id: userId } = req.user || {};

  const access = userId === userRecipeId;
  console.log(await recipeModel.recipesById(req.params.id))
  return res.status(200).render('recipesDetails', { instructions, name, ingredients, access });
}

module.exports = {
  listRecipes,
  recipeDetails,
};
