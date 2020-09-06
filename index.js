require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipesController.renderRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', controllers.userController.registerForm);
app.post('/register', controllers.userController.register);

app.post('/recipes', middlewares.auth(), controllers.recipesController.registerRecipe);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.searchRecipe);
app.get('/recipes/new', middlewares.auth(), controllers.recipesController.renderRecipeNew);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.renderRecipeDetail);
app.get('/recipes/:id/edit', controllers.recipesController.renderRecipeEdit);
app.get('/recipes/:id/delete', controllers.recipesController.renderRecipeDelete);

app.listen(3000, () => console.log('Listening on 3000'));
