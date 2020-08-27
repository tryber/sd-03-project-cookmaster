const recipeModel = require('../models/recipeModel');

const recipes = async (req, res) => {
  const listRecipes = await recipeModel.getRecipes();
  return res.render('/home', { listRecipes});
};

module.export = {
  recipes,
};
