const { getAll } = require('../../models');

const getAllrecipes = async (req, res) => {
  const recipes = await getAll();

  return res.render('home', { recipes, user: req.user });
};

module.exports = getAllrecipes;
