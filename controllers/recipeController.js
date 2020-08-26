const recipeModel = require('../models/recipeModel');

async function listRecipes() {
  return recipeModel.getAllWithUsers();
}

async function recipePermission(req, res, next) {
  const recipesList = await recipeModel.recipesById(req.params.id);
  const recipe = recipesList[0];

  if (!recipe) res.send('Não temos essa receita');

  const { userId } = recipe;
  const { id: clientId } = req.user || {};

  res.access = clientId === userId;
  res.recipe = recipe;

  next();
}

async function recipeDetails(_req, res) {
  const { access, recipe: { instructions, name, ingredients, userId } } = res;
  return res.status(200)
    .render('recipesDetails', { instructions, name, ingredients, access, userId });
}

async function getRecipesByName(req, res) {
  const recipeName = req.query.recipe;
  if (!recipeName) return res.status(200).render('recipesSearch', { recipes: null });
  const recipes = await recipeModel.recipesByName(recipeName);
  return res.status(200).render('recipesSearch', { recipes });
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
  );
  next();
}

async function editRecipe(req, res) {
  const { name, ingredients, instructions } = res.recipe;
  const { id } = req.params;
  res.status(200).render('editRecipe', { name, ingredients, instructions, id });
}

module.exports = {
  listRecipes,
  recipeDetails,
  getRecipesByName,
  createRecipe,
  editRecipe,
  recipePermission,
};
