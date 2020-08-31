const recipesModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

const recipesList = async (req, res) => {
  const listData = await recipesModel.listRecipes();
  res.render('home', { listData, usuario: req.user });
};

const recipeByid = async (req, res) => {
  console.log(req.params);
  const recipeItem = await recipesModel.findRecipById(req.params.id);
  const { ingredients } = recipeItem;
  const arrayIngredients = ingredients.split(',');
  recipeItem.ingredients = arrayIngredients;
  res.render('recipeDetail', { recipeItem, usuario: req.user })
};

const editRecipeForm = async (req, res) => {
  const recipe = await recipesModel.findRecipById(req.params.id);
  const { id } = req.user;
  const { ingredients, userId, recipeId } = recipe;
  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  if (userId !== id) res.redirect(`/recipeDetail/${recipeId}`);

  return res.render('recipeEdit', { recipe, user: req.user });
};

const editRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;

  await recipesModel.editRecipe(req.params.id, recipeName, ingredients, instructions);

  return res.redirect('/me/recipes');
};

const deleteRecipeForm = async (req, res) => {
  const { id } = req.user;
  const { userId } = await recipesModel.findRecipById(req.params.id);
  if (userId !== id) res.redirect('/');
  return res.render('recipeRemove', { message: null, user: req.user, id: req.params.id });
};

const deleteRecipe = async (req, res) => {
  const { id2 } = req.user;
  const { senha } = req.body;
  const { password } = await userModel.findById(id2);

  if (password !== senha) {
    return res.render('recipeRemove', { message: 'Senha Incorreta.', user: req.user, id: req.params.id });
  }
  await recipesModel.deleteRecipe(req.params.id);
  return res.redirect('/');
};

const searchRecipe = async (req, res) => {
  const { filter } = req.query;

  if (filter === '') return res.render('recipeSearch', { recipesFiltered: null, user: req.user });
  const recipesFiltered = await recipesModel.findRecipesSearch(filter);
  return res.render('recipeSearch', { recipesFiltered, user: req.user });
};

const newRecipeForm = async (req, res) => res.render('recipeNew', { user: req.user });

const newRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { name, lastName, id2 } = req.user;
  const userFullName = `${name} ${lastName}`;
 console.log(id2)
  await recipesModel.createNewRecipe(id2, userFullName, recipeName, ingredients, instructions);

  return res.redirect('/');
};
const getUserRecipes = async (req, res) => {
  const { id2 } = req.user;

  const recipes = await recipesModel.findRecipesByUserId(id2);

  return res.render('admin/my-recipes', { recipes, user: req.user });
};



module.exports = {
  recipesList,
  recipeByid,
  editRecipeForm,
  editRecipe,
  deleteRecipeForm,
  deleteRecipe,
  searchRecipe,
  newRecipeForm,
  newRecipe,
  getUserRecipes,
};
