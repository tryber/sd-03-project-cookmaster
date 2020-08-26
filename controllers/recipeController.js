const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.findAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: {} });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes };
