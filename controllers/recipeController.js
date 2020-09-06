const models = require('../models');
const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await models.recipeModel.fetchAllRecipes();
  return res.render('home', { user: req.user, recipes });
};

const listMyRecipes = async (req, res) => {
  const recipes = await models.recipeModel.listByUserId(req.user.id);
  return res.render('recipes/me', { recipes });
}

const recipeDetails = async (req, res) => {
  const recipe = await models.recipeModel.findById(req.params.id);
  return res.render('recipes/details', {
    recipe, owned: (req.user && recipe.uId === req.user.id) ? true : false,
  });
};

const recipeQuery = async (req, res) => {
  const recipes = await models.recipeModel.findByQuery(req.query.q);
  return res.render('recipes/search', { recipes: recipes || [] });
};

const newRecipeForm = async (_req, res) => res.render('recipes/new');


const newRecipePost = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { id, name, lastName } = req.user;
  const fullName = `${name} ${lastName}`;
  await models.recipeModel.registerRecipe(id, fullName, recipeName, ingredients, instructions);
  return res.redirect('/');
};

const editRecipeForm = async (req, res) => {
  const recipe = await recipeModel.findById(req.params.id);
  const { id } = req.user;
  if (recipe.uId === id) return res.render('recipes/edit', { recipe });
  return res.redirect(`/recipes/${recipe.rId}`);
};

const editRecipePost = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  await recipeModel.upadateRecipe(req.params.id, recipeName, ingredients, instructions);
  return res.redirect('/');
};

const delRecipeForm = async (req, res) => (
  res.render('recipes/delete', { message: null, id: req.params.id })
);


const delRecipePost = async (req, res) => {
  const { psw } = req.body;
  const { password } = await models.userModel.findById(req.user.id);
  const { id } = req.params;
  if (psw !== password) return res.render('recipes/delete', { message: 'Senha incorreta.', id });
  await recipeModel.deleteRecipe(id);
  return res.redirect('/');
};

module.exports = {
  listRecipes,
  recipeDetails,
  recipeQuery,
  newRecipeForm,
  newRecipePost,
  editRecipeForm,
  editRecipePost,
  delRecipeForm,
  delRecipePost,
  listMyRecipes,
};
