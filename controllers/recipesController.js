const recipesModel = require('../models/recipesModel');

const recipesList = async (req, res) => {
  const listData = await recipesModel.listRecipes();
  res.render('home', { listData, usuario: req.user });
};

module.exports = {
  recipesList,
};
