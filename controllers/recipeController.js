const { getRecipesNamesAndAuthors } = require('../models/recipeModel');

const listRecipes = async (_req, res) => {
  const recipes = await getRecipesNamesAndAuthors();
  console.log(recipes);
  res.render('home', recipes || [] );
};
module.exports = { listRecipes };
