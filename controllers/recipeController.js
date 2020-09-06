const Recipe = require('../models/recipeModel');
const User = require('../models/userModel')

const listRecipes = async (req, res) => {
  const recipes = await Recipe.getAllRecipes();
  res.render('home', { user: req.user, recipes });
  // Pega o usuário do userData no auth.js
  // Retorna todas as receitas para serem renderizadas no ejs da home
};

const recipeDetail = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) res.status(404).render('Receita não encontrada');
  res.status(200).render('details', { recipe, user: req.user || [] });
};

const searchByName = async (req, res) => {
  const { q } = req.query;
  const recipes = await Recipe.findByName(q);
  return res.render('search', { recipes, user: req.user, message: 'A pesquisa demorou' });
};

const searchByUser = async (req, res) => {
  const recipes = await Recipe.findByUserID(req.user.id);
  return res.render('myrecipes', { recipes, user: req.user });
};

const addRecipe = async (req, res) => {
  const { id, firstName, lastName } = req.user;
  await Recipe.addNew({ ...req.body, userID: id, user: `${firstName} ${lastName}` });
  res.status(201).render('admin/userCreated', { message: 'Receita inserida com sucesso!' });
};

const editRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (req.user.id !== recipe.userID) res.redirect(`/recipes/${recipe.userID}`);
  res.render('editRecipe', { recipe, user: req.user });
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  await Recipe.update(req.params.id, name, ingredients, instructions);
  res.redirect('/');
};

const confirmDeleteForm = async (req, res) => {
  res.render('confirmRecipeDelete', { recipeID: req.params.id, message: '' });
};

const deleteRecipe = async (req, res) => {
  const { password } = await User.findById(req.user.id);
  if (password === req.body.typedPassword) {
    await Recipe.erase(req.params.id);
    res.redirect('/recipes');
  } else {
  res.render('confirmRecipeDelete', {
    recipeID: req.params.id,
    user: req.user,
    message: 'Senha incorreta.',
    });
  }
};

module.exports = {
  listRecipes,
  recipeDetail,
  searchByName,
  searchByUser,
  addRecipe,
  editRecipe,
  updateRecipe,
  confirmDeleteForm,
  deleteRecipe,
};
