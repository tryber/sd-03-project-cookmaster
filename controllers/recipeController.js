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
}

module.exports = {
  showResume,
  showRecipe,
  searchRecipe,
};
