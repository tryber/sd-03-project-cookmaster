const Recipes = require('../models/recipeModel')
async function home(req, res, next) {
  const {token} = req.cookies
  const recipes = await Recipes.getAllRecipes()
  return res.render('home', { logged: !!token, recipes });
}

module.exports = { home };
