const { searchRecipes } = require('../models');

const callSearchRecipes = async (req, res) => {
  const { q } = req.query;
  const recipe = await searchRecipes.findByQuery(q);
  return res.render('recipes/search', { recipe: recipe || [], user: req.user });
};

module.exports = {
  callSearchRecipes,
};
