const recipeModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

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
  const recipes = await recipeModel.getRecipes();

  if (password === confirmationPassword) {
    await recipeModel.deleteRecipe(id);
    res.render('home', {
      id,
      mensage: null,
      user: req.user,
      recipes,
    });
  }

  res.render('deleteRecipe', { id, mensage: 'Senha Incorreta.' });
};

module.exports = {
  recipeDetails,
  searchFilterRecipes,
  notFilteredRecipes,
  recipeRegister,
  deleteRecipeValidate,
};
