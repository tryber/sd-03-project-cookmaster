const Recipes = require('../models/recipeModel');

async function recipes(req, res) {
  const recipe = await Recipes.getRecipeById(req.params.id);
  let id;
  if (req && req.user) {
    id = req.user.id;
  }
  res.render('recipes', { recipe, isOwner: id === recipe.id });
}

module.exports = { recipes };
