require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
// Reading the cookie that contains the authentication token.
const cookieParser = require('cookie-parser');
// Starting
const middlewares = require('./middlewares');
const { userController, recipeController } = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

// In order to carry out any type of change in the database
// (such as registration, editing or deletion of recipes),
// authentication will be required. To view recipes, authentication is not required.

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

// Initial routes
app.get('/login', controllers.userController.loginForm);
app.post('/login', controllers.userController.login);

app.get('/logout', controllers.userController.logout);

app.get('/signup', controllers.userController.signupForm);
app.post('/signup', controllers.userController.signup);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipeForm);
app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipes);

app.post('/recipes', middlewares.auth(), controllers.recipeController.newRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetails);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.editRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipeForm);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.getUserRecipes);
app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
app.post('/me', middlewares.auth(), controllers.userController.editUser);

// The project must be running on port 3000.
app.listen(3000, () => console.log('Listening on 3000'));
