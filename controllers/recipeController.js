const recipesModel = require('../models/recipesModel');

const listRecipes = async (_req, res) => {
  try {
    const recipes = await recipesModel.findAllRecipes();
    return res.render('home', { recipes });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes };
