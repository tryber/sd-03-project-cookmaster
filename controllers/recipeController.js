const Recipe = require('../models/recipeModel');

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
}

const recipeSearch = async (req, res) => {
  const { q } = req.query;

  if (!q) res.render('search', { recipes: null, user: req.user, message: 'Digite algo' });

  const recipes = await Recipe.findByName(q);
  return res.render('search', { recipes, user: req.user, message: 'A pesquisa demorou' });
}

const addRecipe = async (req, res) => {
  const { id, firstName, lastName } = req.user;
  await Recipe.addNew({ ...req.body, userID: id, user: `${firstName} ${lastName}` });
  res.status(201).render('admin/userCreated', { message: 'Receita inserida com sucesso!' });
}

const editRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if ( req.user.id !== recipe.userID ) res.redirect(`/recipes/${recipe.userID}`);
  res.render('editRecipe', { recipe, user: req.user });
}

module.exports = { 
  listRecipes,
  recipeDetail,
  recipeSearch,
  addRecipe,
  editRecipe,
};
