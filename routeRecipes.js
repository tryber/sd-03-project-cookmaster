require('dotenv/config');
const express = require('express');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const router = express.Router();

router.post('/', middlewares.auth(), controllers.cookController.setNewRecipe);
router.get('/new', middlewares.auth(), controllers.cookController.newRecipe);
router.get('/search', middlewares.auth(false), controllers.cookController.searchRecipe);
router.get('/:id', middlewares.auth(false), controllers.cookController.cooks);

module.exports = router;
