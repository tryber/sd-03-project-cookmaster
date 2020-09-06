const { recipeModel } = require('../models');

const callRecipes = async (req, res) => {
  const allrecipes = await recipeModel.findRecipes();
  return res.render('home', { allrecipes, user: req.user });
};

module.exports = {
  callRecipes,
};
