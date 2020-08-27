const { getAllRecipes } = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: 0 });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
module.exports = { listRecipes };
