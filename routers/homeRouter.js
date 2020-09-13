const middlewares = require('../middlewares/');
const { Router } = require('express');

const { homeController } = require('../controllers');

const home = Router();

home.get('/', middlewares.auth(false), homeController.getAllRecipes);

module.exports = home;
