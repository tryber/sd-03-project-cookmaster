const { findByName } = require('../models/searchModel');
const { getAllRecipes } = require('../models/recipeModel');

const searchRecipe = async (req, res) => {
  try {
    const { query } = req.query;
    // console.log('input', input)
    console.log('query', query)
    const recipes = query && (await findByName(query));
    // console.log('recipe', recipes);
    if (query === '') return res.render('search', { recipes: null, user: req.user });
    // console.log('----------------------------')
    if (req.user) return res.render('search', { recipes, user: req.user });
    return res.render('search', { recipes, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { searchRecipe };
