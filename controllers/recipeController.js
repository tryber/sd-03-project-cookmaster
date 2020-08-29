const recipesModel = require('../models/recipesModel');

const showAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.findAllRecipes();
    return res.render('home', { recipes, user: req.user || null });
  } catch (error) {
    return error;
  }
};

const showRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.findRecipeById(id);
    return recipe ? res.render('recipe', { recipe, user: req.user || null })
      : res.status(404).render('notFound');
  } catch (error) {
    return error;
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { q } = req.query;
    const recipes = await recipesModel.findRecipesByName(q);
    if (!q) return res.render('search', { recipes: null, user: req.user || null });

    return res.render('search', { recipes, user: req.user || null });
  } catch (error) {
    return error;
  }
};

const addRecipe = async (req, res) => {
  const {
    id: userId,
    name: userName,
  } = req.user;
  const {
    recipeName = null,
    ingredients = null,
    instructions = null,
  } = req.body;

  await recipesModel.newRecipe(
    userId,
    userName,
    recipeName,
    ingredients,
    instructions,
  );

  return res.status(200).redirect('/');
};

async function recipePermission(req, res, next) {
  const recipe = await recipesModel.findRecipeById(req.params.id) || {};
  if (!recipe) res.status(404).render('notFound');
  const { userId } = recipe;
  const { id } = req.user || {};
  if (userId !== id) res.send('Você não tem permissão para acessar esta página.');
  res.recipe = recipe;

  next();
}

function showRecipeToEdit(req, res) {
  const { name, ingredients, instructions } = res.recipe || {};
  const { id } = req.params;
  res.status(200).render('admin/updateRecipe', {
    user: req.user,
    id,
    name,
    instructions,
    ingredients,
  });
}

async function updateRecipe(req, res) {
  try {
    const { recipeName, ingredients, instructions } = req.body;
    const { id } = req.params;
    await recipesModel.updateRecipe(id, recipeName, ingredients, instructions);
    // res.status(200).redirect('/me/recipes');
    res.status(200).redirect('/');
  } catch (error) {
    return error;
  }
  
}

async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    await recipesModel.deleteRecipe(id);
    res.redirect('/');
  } catch (error) {
    return error;
  }
}

async function deleteForm(_req, res) {
  res.render('admin/deleteForm', { message: null });
}

module.exports = {
  showAllRecipes,
  showRecipeDetails,
  searchRecipes,
  addRecipe,
  recipePermission,
  showRecipeToEdit,
  updateRecipe,
  deleteForm,
  deleteRecipe,
};
