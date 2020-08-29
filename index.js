const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/signup', controllers.userController.registry);
app.post('/signup', middlewares.validation, controllers.userController.registry);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.post('/recipes', middlewares.auth(), controllers.recipeController.registryRecipe);
app.get(
  '/recipes/search',
  middlewares.auth(false),
  controllers.recipeController.listRecipesByQuery,
);
app.get('/recipes/new', middlewares.auth(), (req, res) => res.render('recipes/newRecipe', { user: req.user }));
app.get(
  '/recipes/:id',
  middlewares.auth(false),
  middlewares.recipeFilter,
  controllers.recipeController.listRecipeByID,
);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.updateRecipe);
app.get(
  '/recipes/:id/edit',
  middlewares.auth(),
  middlewares.recipeFilter,
  controllers.recipeController.listRecipeForUpdateByID,
);
app.get('/recipes/:id/delete', middlewares.auth(), (req, res) => res.render('recipes/delete', { recipeId: req.params.id, message: null }));
app.post(
  '/recipes/:id/delete',
  middlewares.auth(),
  controllers.userController.validatePassword,
  controllers.recipeController.deleteRecipe,
);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.userRecipes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
