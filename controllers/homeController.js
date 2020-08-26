const recipesModel = require('../models/recipesModel');

const showRecipes = async (req, res) => {
  try {
      const recipes = await recipesModel.findAllRecipes();
      if (!req.user) return res.render('home', { recipes, user: null });
      return res.render('home', { recipes, user: req.user });
  } catch (error) {
      return error;
  }
};

module.exports = { showRecipes };
