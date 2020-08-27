const homeModel = require('../models/homeModel');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  listRecipes,
};
