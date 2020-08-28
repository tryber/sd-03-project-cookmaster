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

    if (!query) return res.render('sharchRecipes', { sharchRecipes: [], user });
    const sharchRecipes = await recipesModal.findSharchRecipe(query);
    return res.render('sharchRecipes', { sharchRecipes, user });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes, listRecipesById, listsharchRecipes };
