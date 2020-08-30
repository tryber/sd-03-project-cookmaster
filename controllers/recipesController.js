const recipesModal = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    const { user } = req;
    const recipes = await recipesModal.finfByRecipes();

    if (!user) return res.render('home', { recipes, user: null });

    return res.render('home', { recipes, user });
  } catch (error) {
    return error;
  }
};

const listRecipesById = async (req, res) => {
  try {
    const { user } = req;
    const idRecipe = await recipesModal.findRecipesById();

    return res.render('details', { idRecipe, user });
  } catch (error) {
    return error;
  }
};

const listsharchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const { user } = req;

    if (!query) return res.render('shearchRecipes', { shearchRecipes: [], user });
    const shearchRecipes = await recipesModal.findSharchRecipe(query);
    return res.render('shearchRecipes', { shearchRecipes, user });
  } catch (error) {
    return error;
  }
};

const formRecipe = async (req, res) => res.render('newRecipeForm', { user: req.user });

const newRecipes = async (req, res) => {
  const { user } = req.user;
  const { recipeName, ingredients, instructions } = req.body;
  const { id, name, lastName } = user;
  const userName = `${name} ${lastName}`;

  await recipesModal.createNewRecipes(id, userName, recipeName, ingredients, instructions);

  return res.redirect('/', { user });
};

module.exports = { listRecipes, listRecipesById, listsharchRecipes, newRecipes, formRecipe };
