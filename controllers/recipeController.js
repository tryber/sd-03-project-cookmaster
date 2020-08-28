const homeModel = require('../models/homeModel.js');

const listRecipes = async (req, res) => {
  const recipes = await homeModel.getAll();
  // console.log(req.user);
  // console.log(recipes);

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  listRecipes,
};
