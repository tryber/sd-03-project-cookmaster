const { Router } = require('express');

const { recipeController } = require('../controllers');
const middlewares = require('../middlewares');

const me = Router();

me.get('/', middlewares.auth(), recipeController.myRecipes);

module.exports = me;
