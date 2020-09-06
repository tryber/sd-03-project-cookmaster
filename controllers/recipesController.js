const recipesModel = require('../models/recipesModel');
const rescue = require('express-rescue');

const renderRecipes = rescue(async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  res.render('home', { recipes, user: req.user });
});

const renderRecipeDetail = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.recipeById(id);

  const user = req.user;

  if (user && recipe.userId === user.id) {
    return res.render('recipeDetail', { recipe, user, display: true });
  }

  return res.render('recipeDetail', { recipe, user, display: false });
});

const renderRecipeEdit = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.recipeById(id); 

  res.render('recipeEdit', { user: req.user, recipe, message: null });
});

const renderRecipeDelete = rescue(async (req, res) => {
  res.render('recipeDelete', { user: req.user });
});

const searchRecipe = rescue(async (req, res) => {
  const search = req.query.q;

  const recipes = await recipesModel.recipeByName(search);
  res.render('recipeSearch', { recipes, user: req.user });
});

const renderRecipeNew = rescue(async (req, res) => {
  res.render('recipeNew', { user: req.user, message: null });
});

const registerRecipe = rescue(async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { id, name, lastName } = req.user;
  const userName = `${name} ${lastName}`;

  if (!recipeName || !ingredients || !instructions) {
    res.render('recipeNew', { user: req.user, message: 'Todos os campos devem ser preenchidos' });
  }

  await recipesModel.addRecipe(id, userName, recipeName, ingredients, instructions);

  return res.redirect('/');
});

const recipeEdit = rescue(async (req, res) => {
  const { id } = req.params;
  const { recipeName, ingredients, instructions } = req.body;

  if (!recipeName || !ingredients || !instructions) {
    res.render('recipeNew', { user: req.user, message: 'Todos os campos devem ser preenchidos' });
  }

  await recipesModel.updateRecipe(id, recipeName, ingredients, instructions);

  return res.redirect(`/recipes/${id}`);
})

module.exports = {
  renderRecipes,
  renderRecipeDetail,
  renderRecipeEdit,
  renderRecipeDelete,
  renderRecipeNew,
  searchRecipe,
  registerRecipe,
  recipeEdit,
};
