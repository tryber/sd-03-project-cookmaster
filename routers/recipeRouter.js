const middlewares = require('../middlewares');
const { Router } = require('express');

const { recipeController } = require('../controllers');

const recipe = Router();

recipe.get('/:id', middlewares.auth(false), recipeController.recipeDetails);

module.exports = recipe;
