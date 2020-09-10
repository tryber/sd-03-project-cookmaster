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

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/signup', controllers.userController.signupForm);
app.post('/login', controllers.userController.login);
app.post('/signup', controllers.userController.signup);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipes);
app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipeForm);

app.post('/recipes', middlewares.auth(), controllers.recipeController.newRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetails);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.updateRecipe);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.updateRecipeForm);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.getUserRecipes);
app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
app.post('/me', middlewares.auth(), controllers.userController.editUser);

app.listen(3000, () => console.log('Listening on 3000'));
