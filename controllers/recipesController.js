const recipeModel = require('../models/recipeModel');

// const token = uuid();
// SESSIONS[token] = user.id;

const recipes = async (req, res) => {
  const { user } = req;
  const listRecipes = await recipeModel.getRecipes();
  // if (!user) return res.render('home', { listRecipes, user: null });
  return res.render('home', { listRecipes, user });
};

const recipesById = async (req, res) => {
  const { user } = req;
  const recipesId = await recipeModel.getRecipesById();
  return res.render('detailsRecipes', { recipesId, user });
};

const findRecipes = async (req, res) => {
  const { q } = req.query; const { user } = req;
  if (!q) return res.render('searchRecipes', { searchRecipe: [], user });
  const searchRecipe = await recipeModel.getRecipesByQuery(q);
  return res.render('searchRecipes', { searchRecipe, user });
};

const createForm = (req, res) => res.render('createRecipes', { recipes: [], message: null, user: req.user });

const createRecipes = async (req, res) => {
  const { body, user } = req;
  try {
    const recipes = await recipeModel.postRecipes(body, user);
    return res.render('createRecipes', { recipes: ['receita'], message: 'Receita cadastrada com sucesso', redirect: null, user });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  recipes,
  recipesById,
  findRecipes,
  createRecipes,
  createForm,
};
