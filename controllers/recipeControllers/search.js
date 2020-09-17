const { findRecipesByQuery } = require('../../models');

const search = async (req, res) => {
  const { searchQuery } = req.query;

  if (searchQuery === '') {
    return res.render('search', { recipes: null, user: req.user });
  }

  const recipes = await findRecipesByQuery(search);

  return res.render('search', { recipes, user: req.user });
};

module.exports = search;
