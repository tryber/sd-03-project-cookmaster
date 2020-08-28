const recipesModel = require('../models/recipesModel');

const homePage = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  // console.log(recipes);
  try {
    res.render('home', { recipes, user: req.user });
  } catch (e) {
    console.error(e);
  }
  return;
};

module.exports = {
  homePage,
}
