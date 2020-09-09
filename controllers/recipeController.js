const recipesModel = require('../models/getAll');

const renderRecipes = async (req, res) => {
  const allrecipes = await recipesModel.getAll();
  return res.render('home', { allrecipes, user: req.user });
};

module.exports = renderRecipes;