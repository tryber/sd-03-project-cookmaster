const recipesModal = require('../models/recipesModel');
const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    const { user } = req;
    const recipes = await recipesModal.finfByRecipes(req.params.id);

    if (!user) return res.render('home', { recipes, user: null });

    return res.render('home', { recipes, user });
  } catch (error) {
    return error;
  }
};

const listRecipesById = async (req, res) => {
  try {
    const { user } = req;
    const recipe = await recipesModal.findRecipesById(req.params.id);

    return res.render('details', { recipe, user });
  } catch (error) {
    return error;
  }
};

const listsharchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const { user } = req;

    if (!query) return res.render('shearchRecipes', { shearchRecipes: [], user });
    const shearchRecipes = await recipesModal.findSharchRecipe(query);
    return res.render('shearchRecipes', { shearchRecipes, user });
  } catch (error) {
    return error;
  }
};

const formRecipe = async (req, res) => res.render('newRecipeForm', { user: req.user });

const newRecipes = async (req, res) => {
  const { user } = req.user;
  const { recipeName, ingredients, instructions } = req.body;
  const { id, name, lastName } = user;
  const userName = `${name} ${lastName}`;

  await recipesModal.createNewRecipes(id, userName, recipeName, ingredients, instructions);

  return res.redirect('/', { user });
};

const formEditRecipe = async (req, res) => {
  const { user } = req;
  const { id } = req.user;
  const recipe = await recipesModal.findRecipesById(id);

  const { userId, recipeId } = await recipe;

  if (userId !== id) return res.redirect(`/recipes/${recipeId}`);

  return res.render('editRecipe', { recipe, user });
};

const editRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;

  await recipesModel.editRecipe(req.params.id, recipeName, ingredients, instructions);

  return res.redirect('/user/recipes');
};

//conferência do cód com PR da Carolis.
const getUserRecipe = async (req, res) => {
  const { id, user } = req.user;
  const recipes = await recipesModal.findRecipesById(id);

  return res.render('recipeUser', { recipes, user });
};

module.exports = {
  listRecipes,
  listRecipesById,
  listsharchRecipes,
  newRecipes,
  formRecipe,
  formEditRecipe,
  editRecipe,
  getUserRecipe,
};
