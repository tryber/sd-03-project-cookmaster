const recipesModel = require('../models/recipesModel');
const { SESSIONS } = require('../middlewares/auth');
const getAllRecipes = async (req, res) => {
  const logged = Object.entries(SESSIONS)
  console.log(logged)
  const recipes = await recipesModel.getRecipes();
  res.render('home', { recipes, logged })
}

module.exports = {
  getAllRecipes,
};
