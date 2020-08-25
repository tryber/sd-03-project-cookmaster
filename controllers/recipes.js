const RecipeModel = require('../models/recipes');

const listRecipes = async (_req, res) => {
  const recipes = await RecipeModel.getAll();

  res.render('listRecipes', { recipes, message: null });
};

const newRecipe = async (req, res) => {
  const { name, age } = req.body;

  if (!RecipeModel.isValid(name, age)) {
    res.status(402).render('listRecipes', { recipes: null, message: 'Nome ou idade inválidos' });
  }

  await RecipeModel.add(name, parseInt(age, 10));

  res.status(201).render('success');
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeModel.getRecipeById(id);

  if (!recipe) return res.status(404).render('notFound');

  res.status(200).render('recipeDetails', { recipe });
};

module.exports = {
  listRecipes,
  newRecipe,
  recipeDetails
};
