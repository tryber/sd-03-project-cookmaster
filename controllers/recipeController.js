const homeModel = require('../models/homeModel');
const userModel = require('../models/userModel');


const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);

  res.render('recipes/recipes', { rec: recipe[0], user: req.user });
};

const searchRecipe = async (req, res) => {
  const { input } = req.query;

  const searched = await homeModel.findRecipeByQuery(input);

  if (searched) res.render('recipes/search', { searched, user: req.user });
  res.render('recipes/search', { user: req.user });
};

const newRecipe = async (req, res) => {
  res.render('recipes/new', { user: req.user, message: null });
};

const saveRecipe = async (req, res) => {
  const { nome, inputListaIngredientes, modoPreparo } = req.body;
  const { id, name, lastName } = req.user;
  const completeUser = name.concat(lastName);

  await homeModel.insertNewRecipe(id, completeUser, nome, inputListaIngredientes, modoPreparo);
  res.redirect('/');
};

const editById = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);

  if (req.user.id !== recipe[0].userId) {
    res.redirect('/');
  }

  res.render('recipes/edit', { rec: recipe[0], user: req.user });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { nome, inputListaIngredientes, modoPreparo } = req.body;
  await homeModel.updateRecipe(id, nome, inputListaIngredientes, modoPreparo);

  res.redirect('/');
};

const consultDelete = async (req, res) => {
  const { id } = req.params;
  return res.render('recipes/delete', { message: null, recId: id });
};

const confirmDelete = async (req, res) => {
  const { id } = req.params;
  const { senha } = req.body;
  const { password } = await userModel.findById(req.user.id);

  if (senha !== password) {
    return res.render('recipes/delete', { message: 'Senha Incorreta.', recId: id });
  }

  await homeModel.deleteRecipe(id);
  res.redirect('/');
  return null;
};

module.exports = {
  listRecipes,
  getRecipe,
  searchRecipe,
  newRecipe,
  saveRecipe,
  editById,
  updateById,
  consultDelete,
  confirmDelete,
};
