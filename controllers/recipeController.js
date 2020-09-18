const Recipes = require('../models/recipeModel');
const userModel = require('../models/userModel');

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
  res.redirect('/');
  // return res.render('admin/new', { user: req.user, message: 'Receita criada com sucesso!' });
};

const rendEdit = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  res.render('admin/edit', { recipe, user: req.user, message: null });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  await Recipes.updateRecipe(id, name, ingredients, instructions);
  res.redirect('/');
};

const rendDel = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  res.render('admin/delete', { recipe, user: req.user, message: null });
};

const delRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getRecipeById(id);
  const { passwordInput } = req.body;
  const { password } = await userModel.findById(req.user.id);
  if (password !== passwordInput) {
    return res.render('admin/delete', {
      recipe,
      message: 'Senha Incorreta.',
      redirect: null,
    });
  }
  await Recipes.deleteRecipe(id);
  return res.redirect('/');
};

const userRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await Recipes.getRecipeByUserId(id);
  res.render('admin/mine', { recipes, user: req.user, message: null });
};

module.exports = {
  listRecipes,
  recipeDetail,
  searchRecipes,
  newRecipe,
  rendNew,
  rendEdit,
  editRecipe,
  rendDel,
  delRecipe,
  userRecipes,
};
