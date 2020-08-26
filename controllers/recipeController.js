const Recipe = require("../models/recipeModel");

const listRecipes = async (_req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    return res.render('home', { recipes });
  } catch (error) {
    console.log(error);
  }
  // Renderiza todas as receitas na ejs home
};

module.exports = {
  listRecipes
}