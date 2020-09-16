const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', {
    recipes,
    message: null,
    user: req.user,
  });
};

const showOneRecipe = async (req, res) => {
  const recipe = await recipeModel.getRecipeById(req.params.id);
  res.render('details', {
    recipe,
    message: null,
    user: req.user,
  });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  const recipes = await recipeModel.findRecipes(q);

  return res.render('search', { recipes, message: null, user: req.user });
};

const newRecipePage = async (req, res) => res.render('newRecipe',
  { message: null, area: 'Nova Receita', user: req.user });

const createRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id: userId, firstName, lastName } = req.user;
  const userName = `${firstName} ${lastName}`;
  await recipeModel.createRecipe(userId, userName, name, ingredients, instructions);
  res.redirect('/');
};

const editRecipePage = async (req, res) => {
  const { id: userId } = req.user;
  const { id: recipeId } = req.params;
  const recipe = await recipeModel.getRecipeById(recipeId);
  const { userId: recipeUserId } = recipe;

  if (userId !== recipeUserId) res.redirect('/');

  res.render('editRecipe',
    { recipe, message: null, area: 'Editar Receita', user: req.user, id: recipeId });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  await recipeModel.editRecipe(id, name, ingredients, instructions);
  res.redirect(`/recipes/${id}`);
};

const myRecipesPage = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.getRecipesByUserId(id);
  res.render('myRecipes', { recipes, message: null, user: req.user, area: 'Minhas Receitas' });
};

module.exports = {
  showRecipes,
  showOneRecipe,
  searchRecipe,
  newRecipePage,
  createRecipe,
  editRecipePage,
  editRecipe,
  myRecipesPage,
};
