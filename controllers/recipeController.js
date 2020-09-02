const { getAllRecipes, getRecipeById, insertRecipe } = require('../models/recipeModel');

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
    const { id } = req.params;
    const [recipe] = await getRecipeById(id);
    // console.log('recipe', recipe);
    if (req.user) return res.render('recipes/id', { recipe, user: req.user });
    return res.render('recipes/id', { recipe, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const postRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  console.log('req.body', req.body);
  await insertRecipe(name, ingredients, instructions);
  return res.render('recipes/new', { message: 'Registrada com sucesso' });
};

module.exports = { listRecipes, getRecipe, postRecipe };
