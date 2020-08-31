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

const editRecipe = async (req, res) => {
  const { id } =  req.user;
  const idRecipe = req.params.id; 
  const recipes = await recipeModel.editRecipesBank(id);
  if (id === idRecipe) return res.render('editRecipes', { recipes, message: 'Receita editada!'});
  return res.redirect('/');
};

const deleteRecipe = async (req,res) => {
  const { id } = req.user;
  res.render('deleteRecipe', { recipes: 'null'});
};

module.exports = {
  recipes,
  recipesById,
  findRecipes,
  createRecipes,
  createForm,
  editRecipe,
  deleteRecipe,
};
