const middlewares = require('../middlewares');
const { Router } = require('express');

const { recipeController } = require('../controllers');

const recipe = Router();

recipe.get('/search', recipeController.notFilteredRecipes);
recipe.post('/search', recipeController.searchFilterRecipes);

recipe.get('/:id', middlewares.auth(false), recipeController.recipeDetails);

module.exports = recipe;
