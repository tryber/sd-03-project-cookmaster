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
  //const id = res.end(req.params.id);
  if (!q) return res.render('searchRecipes', { searchRecipe: [], user });
  const searchRecipe = await recipeModel.getRecipesByQuery(q);

  return res.render('searchRecipes', { searchRecipe, user });
};

module.exports = {
  recipes,
  recipesById,
  findRecipes,
};
