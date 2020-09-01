const myRecipesModel = require('../models/myRecipesModel');

const myRecipesPage = async (req, res) => {
  const user = req.user;

  const recipes = await myRecipesModel.getAllMyRecipes(user.id);
  res.render('myRecipes', { recipes, user });
};

module.exports = {
  myRecipesPage,
};
