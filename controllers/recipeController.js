const recipeModel = require('../models/recipeModel');

const showResume = async (req, res) => {
  const listResume = await recipeModel.resumeAllRecipes();
  return res.render('home', { listResume, message: null, user: req.user });
};

const showRecipe = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipe = await recipeModel.getRecipe(id);
  return res.render('recipe', { recipe, message: null, user });
};

const searchRecipe = async (req, res) => {
  const user = req.user;
  const { q } = req.body;
  if (!q) {
    return res.render('search', { message: null, user });
  }
  const result = await recipeModel.searchRecipe(q);
  return res.render('search', { message: null, user, result });
};

const insertRecipe = async (req, res) => {
  const user = req.user;
  const {id, name, lastName } = req.user;
  const { recipeNew, secretList, howToDo } = req.body;
  const fullName = `${name} ${lastName}`;
  const result = await recipeModel.insertRecipe( id, fullName, recipeNew, secretList, howToDo );
  return res.render('recipeNew', { message: null, user, result });
};

const updateRecipe = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = req.user;
  // const {id, name, lastName } = req.user;
  const recipe = await recipeModel.getRecipe(id);
  if (!user || user.id !== recipe[1]) {
    return res.redirect(`/recipes/${id}`);
  }
  console.log('Receita: ', recipe);
  console.log('Usuário: ', user);
  return res.render('deleteRecipe', { message: 'Receita alterada com sucesso!', user, recipe });
};

module.exports = {
  showResume,
  showRecipe,
  searchRecipe,
  insertRecipe,
  updateRecipe,
};
