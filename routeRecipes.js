require('dotenv/config');
const express = require('express');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const router = express.Router();

router.post('/', middlewares.auth(), controllers.cookController.setNewRecipe);
router.get('/new', middlewares.auth(), controllers.cookController.newRecipe);
router.get('/search', middlewares.auth(false), controllers.cookController.searchRecipe);
router.get('/:id/edit', middlewares.auth(), controllers.cookController.recipeToEdit);
router.get('/:id/delete', middlewares.auth(), controllers.cookController.recipeToDelete);
router.post('/:id/delete', middlewares.auth(), controllers.cookController.deleteRecipe);
router.post('/:id', middlewares.auth(), controllers.cookController.editRecipe);
router.get('/:id', middlewares.auth(false), controllers.cookController.cooks);

module.exports = router;
