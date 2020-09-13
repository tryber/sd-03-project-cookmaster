const middlewares = require('../middlewares');
const { Router } = require('express');

const { recipeController } = require('../controllers');

const recipe = Router();

recipe.get('/search', recipeController.notFilteredRecipes);
recipe.post('/search', recipeController.searchFilterRecipes);

recipe.get('/new', middlewares.auth(), (_req, res) => {
  res.render('newRecipe');
});
recipe.post('/new', middlewares.auth(), recipeController.recipeRegister);

recipe.get('/:id', middlewares.auth(false), recipeController.recipeDetails);
recipe.get('/:id/delete', middlewares.auth(), (req, res) => {
  const { id } = req.user;
  res.render('deleteRecipe', { id, mensage: null });
});

recipe.post('/:id/delete', middlewares.auth(), recipeController.deleteRecipeValidate);

module.exports = recipe;
