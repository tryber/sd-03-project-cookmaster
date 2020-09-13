const { Router } = require('express');

const { recipeController, registerController } = require('../controllers');
const middlewares = require('../middlewares');

const me = Router();

me.get('/recipes', middlewares.auth(), recipeController.myRecipes);

me.get('/edit', middlewares.auth(), registerController.editRegistration);
me.post('/', middlewares.auth(), registerController.editRegistration);

module.exports = me;
