const { searchRecipes } = require('../models');

const callMyRecipes = async (req, res) => {
  const { id } = req.user;
  const recipe = await searchRecipes.findByUserQuery(id);
  return res.render('recipes/my', { recipe: recipe || [], user: req.user });
};

module.exports = {
  callMyRecipes,
};
