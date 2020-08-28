const Recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await Recipe.getAllRecipes();
    res.render('home', { user: req.user, recipes });
  // Pega o usuário do userData no auth.js
  // Retorna todas as receitas para serem renderizadas no ejs da home
};

module.exports = { listRecipes };
