const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAll();

  return res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);

  const { ingredients } = recipe;

  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  return res.render('details', { recipe, message: null, user: req.user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: null, message: null, user: req.user });

  const recipes = await recipeModel.findRecipesByQuery(q);

  return res.render('search', { recipes, message: null, user: req.user });
};

const newRecipeForm = async (req, res) =>
  res.render('admin/new', { message: null, user: req.user });

const newRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { name, lastName, id } = req.user;
  const userFullName = `${name} ${lastName}`;

  await recipeModel.createNewRecipe(id, userFullName, recipeName, ingredients, instructions);

  return res.redirect('/');
};

const editRecipeForm = async (req, res) => {
  const recipe = await recipeModel.findRecipeById(req.params.id);
  const { id } = req.user;
  const { ingredients, userId, recipeId } = recipe;
  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  if (userId !== id) res.redirect(`/recipes/${recipeId}`);

  return res.render('admin/edit', { recipe, user: req.user, message: null });
};

const editRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;

  await recipeModel.editRecipe(req.params.id, recipeName, ingredients[0], instructions);

  return res.redirect(`/recipes/${req.params.id}`);
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipes,
  newRecipeForm,
  newRecipe,
  editRecipeForm,
  editRecipe,
};
