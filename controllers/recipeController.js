const Recipes = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipes.getAll();
  res.render('home', { recipes, user: req.user, message: null });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  res.render('recipe', { recipe, user: req.user, message: null });
};

const searchRecipes = async (req, res) => {
  const recipes = await Recipes.getSearchRecipe(req.query.q);
  res.render('search', { recipes, user: req.user, message: null });
};

const rendNew = (req, res) =>
  res.render('admin/new', { user: req.user, message: null });

const newRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id, firstName, lastName } = req.user;
  const userFullName = `${firstName} ${lastName}`;
  await Recipes.addRecipe(id, userFullName, name, ingredients, instructions);
  return res.render('admin/new', { user: req.user, message: 'Receita criada com sucesso!' });
};

const rendEdit = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  res.render('admin/edit', { recipe, user: req.user, message: null });
};

module.exports = {
  listRecipes,
  recipeDetail,
  searchRecipes,
  newRecipe,
  rendNew,
  rendEdit,
};
