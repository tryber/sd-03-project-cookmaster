const recipesModel = require('../models/recipesModel');

const homePage = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  // console.log(recipes);
  try {
    return res.render('home', { recipes, user: req.user});
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  homePage,
}


