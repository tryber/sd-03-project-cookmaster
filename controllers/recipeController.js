const homeModel = require('../models/homeModel.js');

const listRecipes = async (_req, res) => {
  const recipes = await homeModel.getAll();
  console.log(recipes);

  res.render('home', { recipes });
};

module.exports = {
  listRecipes,
};
