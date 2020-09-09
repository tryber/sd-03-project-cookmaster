const recipesModel = require('../models/recipesModel');
const userModel = require('../models/userModel');
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
  const user = req.user;

  if (!user && recipe.userId !== user.id) {
    return res.redirect(`/recipes/${id}`);
  }

  return res.render('recipeEdit', { user: req.user, recipe, message: null });
});

const renderRecipeDelete = rescue(async (req, res) => {
  const { id } = req.user;
  const { userId } = await recipesModel.recipeById(req.params.id);

  if (userId !== id) res.redirect('/');

  return res.render('recipeDelete', { message: null, user: req.user, id: req.params.id });
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
    res.render('recipeNew', { user: req.user, message: 'Todos os campos da receita devem ser preenchidos' });
  }

  await recipesModel.updateRecipe(id, recipeName, ingredients, instructions);

  return res.redirect('/');
});

const recipeDelete = rescue(async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;

  const user = await userModel.findById(currentUser.id);

  const { password } = req.body;

  if (password !== user.password) {
    return res.render('recipeDelete', { user: req.user, id, message: 'Senha Incorreta.' });
  }

  await recipesModel.deleteRecipe(id);

  return res.redirect('/');
});

const renderUserRecipes = rescue(async (req, res) => {
  const user = req.user;

  const recipes = await recipesModel.recipeByUser(user.id);

  res.render('userRecipes', { user, recipes });
});

module.exports = {
  renderRecipes,
  renderRecipeDetail,
  renderRecipeEdit,
  renderRecipeDelete,
  renderRecipeNew,
  searchRecipe,
  registerRecipe,
  recipeEdit,
  recipeDelete,
  renderUserRecipes,
};
