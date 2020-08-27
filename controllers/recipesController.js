const Recipes = require('../models/recipeModel');

async function recipesDescription(req, res) {
  const recipe = await Recipes.getRecipeById(req.params.id);
  let id;
  if (req && req.user) {
    id = req.user.id;
  }
  res.render('recipes', { recipe, isOwner: id === recipe.id });
}

async function searchRecipes(req, res) {
  const query = req.query.q;

  const recipes = await Recipes.searchRecipe(query);

  res.render('search', { recipes });
}

async function newRecipe(req, res) {
  res.render('admin/newRecipe');
}

async function newRecipePOST(req, res) {
  const recipe = req.body;
  const { user } = req;
  if (typeof recipe.ingredients === 'object') {
    recipe.ingredients = recipe.ingredients.join(',');
  }
  user.user = `${user.first_name} ${user.last_name}`;
  console.log(recipe, user);
  await Recipes.createRecipe(user, recipe);
  res.redirect('/recipes/new');
}

module.exports = {
  recipesDescription, searchRecipes, newRecipe, newRecipePOST,
};
