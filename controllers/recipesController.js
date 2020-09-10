const recipesModel = require('../models/recipesModel');

const recipesRender = async (req, res) => {
  const recipes = await recipesModel.recipes();
  console.log(recipes)
  return res.render('home', { recipes, user: req.user });
};

module.exports = {
  recipesRender,
};
