const recipeModel = require('../models/recipeModel');
const { recipeController } = require('.');

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

  console.log(req.body);

  await recipeModel.createNewRecipe(id, userFullName, recipeName, ingredients, instructions);

  return res.render('admin/new', { message: 'Receita cadastrada com sucesso', user: req.user });
};

const editRecipeForm = async (req, res) => {
  const {
    recipeId,
    userId,
    name,
    ingredients,
    instructions,
  } = await recipeModel.findRecipeById(req.params.id);
  const { id } = req.user;

  const insgredientsArr = ingredients.split(',');
  const recipe = { recipeId, name, ingredients: insgredientsArr, instructions };

  if (userId !== id) res.redirect(`/recipes/${recipeId}`);

  return res.render('admin/edit', { recipe, user: req.user, message: null });
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipes,
  newRecipeForm,
  newRecipe,
  editRecipeForm,
};
