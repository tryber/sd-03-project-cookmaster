const { findRecipesByQuery } = require('../../models');

const search = async (req, res) => {
  const { buscar } = req.query;

  if (buscar === '') {
    return res.render('search', { recipes: null, user: req.user });
  }

  const recipes = await findRecipesByQuery(buscar);

  return res.render('search', { recipes, user: req.user });
};

module.exports = search;
