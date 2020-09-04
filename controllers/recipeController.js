const {
  getAllRecipes,
  getRecipeById,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../models/recipeModel');
const { findById } = require('../models/userModel');
const { render } = require('ejs');

const listRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getRecipe = async (req, res) => {
  try {
    const {
      params: { id },
      user,
    } = req;
    const recipe = await getRecipeById(id);
    if (user) return res.render('recipes/id', { recipe, user });
    return res.render('recipes/id', { recipe, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const postRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  await insertRecipe(name, ingredients, instructions, req.user.id);
  return res.render('recipes/new', { message: 'Registrada com sucesso' });
};

const getUpdate = async (req, res) => {
  const { user, params } = req;
  const recipe = await getRecipeById(params.id);
  if (parseInt(user.id, 10) !== recipe.user_id) return res.render('recipes/edit', { recipe, user });
  return res.render('recipes/id', { recipe, user });
};

const postUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  await updateRecipe(id, name, ingredients, instructions);
  return res.redirect('/');
  // return res.render('recipes/edit', { recipe, user: req.user });
};

const confirmDelete = async (req, res) => {
  const { id } = req.params;
  const { autor_id } = await getRecipeById(id);
  if(autor_id !== req.user.id) return render('/');
  res.render('recipes/delete', { message: null });
};


const deleteRecip = async (req, res) => {
  const { id } = req.params;

  if(req.password === findById(req.user.id)) {
    await deleteRecipe(id);
    return res.render('/')
  }
  res.render('recipes/delete', { message: 'Senha incorreta'});
};

module.exports = {
  listRecipes,
  getRecipe,
  postRecipe,
  getUpdate,
  postUpdate,
  deleteRecip,
  confirmDelete
};
