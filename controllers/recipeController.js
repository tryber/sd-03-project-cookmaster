const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const recipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeList();

  return res.render('home', { recipes, token: req.user });
};

const recipeDetail = async (req, res) => {
  const recipeById = await recipeModel.getRecipeById(req.params.id);
  const recipeId = req.params.id;
  const { userId } = recipeById;
  const recipeUser = await userModel.findById(userId);
  return res.render('detail', {
    recipeById,
    token: req.user,
    recipeUser,
    recipeId,
  });
};

const recipeSearch = async (req, res) => {
  const { query } = req.query;

  if (!query) return res.render('search', { recipeBySearch: null, token: req.user, query });

  const recipeBySearch = await recipeModel.getRecipeBySearch(query);

  return res.render('search', {
    recipeBySearch,
    query,
    token: req.user,
  });
};

module.exports = {
  recipeList,
  recipeDetail,
  recipeSearch,
};
