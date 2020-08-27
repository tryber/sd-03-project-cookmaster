const Recipes = require('../models/recipeModel');
const User = require('../models/userModel');

async function recipesDescription(req, res) {
  const recipe = await Recipes.getRecipeById(req.params.id);
  let id;
  if (req && req.user) {
    id = req.user.id;
  }

  res.render('recipes', { recipe, isOwner: id && id === recipe.userId, id: recipe.id });
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
  const recId = await Recipes.createRecipe(user, recipe);
  res.redirect('/');
}

async function editRecipe(req, res) {
  const recipe = await Recipes.getRecipeById(req.params.id);
  res.render('admin/editRecipe', { recipe, id: req.params.id });
}

async function editRecipePOST(req, res) {
  const { user } = req;
  let recipe = await Recipes.getRecipeById(req.params.id);

  if (!user) { return res.status(401).send('sai pra lá jacaré'); }
  if (recipe.userId !== user.id) {
    return res.status(401).send('Ta tentando me enganar miserávi ?');
  }
  recipe = req.body;
  if (typeof recipe.ingredients === 'object') {
    recipe.ingredients = recipe.ingredients.join(',');
  }
  await Recipes.updateRecipe(req.params.id, recipe);
  return res.redirect(`/recipes/${req.params.id}`);
}

async function deleteRecipe(req, res) {
  const { user } = req;
  const recipe = await Recipes.getRecipeById(req.params.id);
  if (!recipe) { return res.status(404).send('Message not found'); }
  if (!user) { return res.status(401).send('sai pra lá jacaré'); }
  if (recipe.userId !== user.id) {
    return res.status(401).send('Ta tentando me enganar miserávi ?');
  }
  return res.render('admin/delete', { message: '' });
}

async function deleteRecipePOST(req, res) {
  const { user } = req;
  const recipe = await Recipes.getRecipeById(req.params.id);
  if (!recipe) { return res.status(404).send('Message not found'); }
  if (!user) { return res.status(401).send('sai pra lá jacaré'); }
  if (recipe.userId !== user.id) {
    return res.status(401).send('Ta tentando me enganar miserávi ?');
  }
  const { password } = await User.findById(user.id);
  if (password !== req.body.password) {
    return res.render('admin/delete', { message: 'Senha Incorreta.' });
  }
  await Recipes.deleteRecipe(req.params.id);
  return res.redirect('/');
}

async function myRecipes(req, res) {
  const { id } = req.user;
  const recipes = await Recipes.getRecipeByUser(id);
  res.render('admin/meRecipes', { recipes });
}

module.exports = {
  recipesDescription,
  searchRecipes,
  newRecipe,
  newRecipePOST,
  editRecipe,
  editRecipePOST,
  deleteRecipe,
  myRecipes,
  deleteRecipePOST,
};
