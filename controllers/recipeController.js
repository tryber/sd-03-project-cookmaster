const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();

  res.status(200).render('home', { recipes, message: null, user: req.user });
};

const renderRecipeForm = async (req, res) => {
  res.status(201).render('recipes/new', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
  });
};

const renderEditRecipeForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);

  res.status(201).render('recipes/edit', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
    recipe,
  });
};

const renderDeleteRecipeForm = async (req, res) => {
  res.status(201).render('recipes/delete', {
    user: req.user,
    message: null,
  });
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  await recipeModel.addRecipe(
    `${req.user.firstName} ${req.user.lastName}`,
    req.user.id,
    name,
    ingredients,
    instructions,
  );

  res.redirect('/');
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id } = req.params;
  try {
    await recipeModel.updateRecipe(id, name, ingredients, instructions);
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const auth = await recipeModel.authUser(id, req.user.id, password);
  if (auth) {
    await recipeModel.deleteRecipeById(id);
    res.status(202).redirect('/');
  }
  res.status(401).render('recipes/delete', {
    user: req.user,
    message: 'Senha Incorreta.',
  });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return res.status(404).render('recipes/notFound');

  return res.status(200).render('recipes/recipeDetail', { recipe, user: req.user });
};

const renderSearch = async (req, res) => {
  const { q } = req.query;

  if (!q && q !== '') {
    res.status(200).render('recipes/search', { recipes: null, user: req.user });
  }

  const recipes = await recipeModel.getRecipeByName(q);

  try {
    res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
  } catch (e) {
    console.error(e);
  }
};

const renderMyRecipes = async (req, res) => {
  const recipes = await recipeModel.getRecipeByUserId(req.user.id);

  res.status(200).render('me/recipes', { recipes, message: null, user: req.user });
};

module.exports = {
  listRecipes,
  recipeDetails,
  renderSearch,
  addRecipe,
  renderRecipeForm,
  renderEditRecipeForm,
  updateRecipe,
  renderDeleteRecipeForm,
  deleteRecipe,
  renderMyRecipes,
};
