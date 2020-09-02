const { findByName } = require('../models/searchModel');
const { getAllRecipes } = require('../models/recipeModel');

const searchRecipe = async (req, res) => {
  try {
    const { input } = req.params;
    // console.log('input', input)
    const recipes = input && (await findByName(input));
    // console.log('recipe', recipes);
    if (!recipes || recipes === []) {
      const all = await getAllRecipes();
      // console.log('all', all)
      return res.render('search', { recipes: all, user: req.user });
    }
    // console.log('----------------------------')
    if (req.user) return res.render('search', { recipes, user: req.user });
    return res.render('search', { recipes, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { searchRecipe };
