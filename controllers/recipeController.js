const {
  getAllRecipes,
  getRecipeById,
  insertRecipe,
  updateRecipe,
} = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getRecipe = async (req, res) => {
  try {
    const { params, user } = req;
    const [recipe] = await getRecipeById(params.id);
    // console.log('recipe', req.user);
    if (user) return res.render('recipes/id', { recipe, user });
    return res.render('recipes/id', { recipe, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const postRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  // console.log('req.user', req.user);
  await insertRecipe(name, ingredients, instructions, req.user.id);
  return res.render('recipes/new', { message: 'Registrada com sucesso' });
};

const getUpdate = async (req, res) => {
  const { id } = req.user;
  const recipe = await getRecipeById(id);
  // console.log('recipe:', req.user)
  if (id !== recipe.user_id) return res.render(`recipes/id`, { recipe, user: req.user });
  return res.render('recipes/edit', { recipe, user: req.user });
};

const postUpdate = async (req, res) => {
  const { name, ingredients, instructions } = req.user;
  await updateRecipe(name, ingredients, instructions);
  return res.render(`recipes/id`, { recipe, user: req.user });
  // return res.render('recipes/edit', { recipe, user: req.user });
};

module.exports = {
  listRecipes,
  getRecipe,
  postRecipe,
  getUpdate,
  postUpdate,
};
