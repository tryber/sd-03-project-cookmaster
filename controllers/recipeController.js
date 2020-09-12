const recipeModel = require('../models/recipesModel');

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

  res.render('newRecipe')
}

module.exports = {
  recipeDetails,
  searchFilterRecipes,
  notFilteredRecipes,
  recipeRegister,
};
