const recipeModel = require('../models/recipesModel');
const userModel = require('../models/userModel');
const recipesModel = require('../models/recipesModel');

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.getRecipesById(id);

  const arrayOfIngredients = recipe.ingredients.split(',');

  res.render('recipeDetails', {
    ...recipe,
    ingredients: arrayOfIngredients,
    userValidation: req.user,
  });
};

const searchFilterRecipes = async (req, res) => {
  const { searchFilter } = req.body;

  const filteredRecipes = await recipeModel.filterRecipe(searchFilter);

  res.render('search', {
    ...filteredRecipes,
    recipes: filteredRecipes ? null : await recipeModel.getRecipes(),
    validation: !!filteredRecipes,
  });
};

const notFilteredRecipes = async (_req, res) => {
  const recipes = await recipeModel.getRecipes();

  res.render('search', { recipes, validation: false });
};

const recipeRegister = async (req, res) => {
  const { id, fullName } = req.user;

  const { recipeName, ingredients, instructions } = req.body;

  await recipeModel.addRecipe(id, fullName, recipeName, ingredients, instructions);

  const recipes = await recipeModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

const deleteRecipeValidate = async (req, res) => {
  const { id } = req.user;
  const { password } = await userModel.findById(id);
  const { confirmationPassword } = req.body;

  if (password === confirmationPassword) {
    await recipeModel.deleteRecipe(id);
    res.redirect('/');
  }

  res.render('deleteRecipe', { id, mensage: 'Senha Incorreta.' });
};

const myRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.filterRecipesByUser(id);

  res.render('myRecipes', { recipes });
};

const editRecipeValidation = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.getRecipesById(id);

  res.render('editRecipe', { ...recipe });
};

const editRecipe = async (req, res) => {
  const { id } = req.user;
  const { id: recipeId } = req.params;
  const { name, ingredients, instructions } = req.body;
  const { user_id } = await recipeModel.getRecipesById(recipeId);

  if (id === user_id) {
    await recipesModel.editRecipe(recipeId, name, ingredients, instructions);
    res.redirect(`/recipes/${recipeId}`)
  }

  res.redirect('/')
};

module.exports = {
  recipeDetails,
  searchFilterRecipes,
  notFilteredRecipes,
  recipeRegister,
  deleteRecipeValidate,
  myRecipes,
  editRecipeValidation,
  editRecipe,
};
