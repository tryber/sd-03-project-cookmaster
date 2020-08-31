const homeModel = require('../models/homeModel');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const checkById = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);

  res.render('recipes/recipes', { rec: recipe[0], user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  const searched = await homeModel.findRecipeByQuery(q);

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
  res.render('recipes/new', { message: 'Receita Cadastrada!', user: req.user });
};

const editById = async (req, res) => {
  const { id } = req.params;
  const recipe = await homeModel.findRecipeById(id);
  console.log(recipe);

  if (req.user.id !== recipe[0].userId)
    res.redirect('/');

  res.render('recipes/edit', { rec: recipe[0], user: req.user });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  console.log(name, ingredients, instructions)
  await homeModel.updateRecipe(id, name, ingredients, instructions);

  res.render(`recipes/${id}`)
};

module.exports = {
  listRecipes,
  checkById,
  searchRecipe,
  newRecipe,
  saveRecipe,
  editById,
  updateById,
};
