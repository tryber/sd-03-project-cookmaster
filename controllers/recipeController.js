const { getAllRecipes } = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    console.log('list recipes', recipes);
    if (req.user) return res.render('home', { recipes, user: req.user });
    res.render('home', { recipes, user: 0 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = { listRecipes };
