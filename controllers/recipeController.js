const recipeModel = require('../models/recipeModel');

async function listRecipes() {
  return recipeModel.getAllWithUsers();
}

async function recipeDetails(req, res) {
  const recipesList = await recipeModel.recipesById(req.params.id);
  const { instructions, name, ingredients, userRecipeId } = recipesList[0];
  const { id: userId } = req.user || {};

  const access = userId === userRecipeId;

  return res.status(200).render('recipesDetails', { instructions, name, ingredients, access });
}

async function getRecipesByName(name) {
  async (req, res) => {
    const recipeName = req.query.recipe;
    if (!recipeName) return res.status(200).render('recipesSearch', { recipes: null });
    const recipes = await recipeModel.recipesByName(name);
    return res.status(200).render('recipesSearch', { recipes });
  }
}

async function createRecipe(req, _res, next) {
  const {
    id: userId,
    name: userName,
  } = req.user;
  const {
    recipeName = null,
    ingredients = null,
    instructions = null,
  } = req.body;

  recipeModel.createNewRecipe(
    userId,
    userName,
    recipeName,
    ingredients,
    instructions,
  )
  next();
}

async function editRecipe(req, res) {
  const recipesList = await recipeModel.recipesById(req.params.id);
  const { name, ingredients, instructions } = recipesList[0];
  res.status(200).render('editRecipe', { name, ingredients, instructions });
}

module.exports = {
  listRecipes,
  recipeDetails,
  getRecipesByName,
  createRecipe,
  editRecipe,
};
