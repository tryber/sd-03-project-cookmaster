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

app.get('/', middlewares.auth(false), controllers.recipeController.showRecipes);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);
app.get('/recipes/new', middlewares.auth(false), controllers.recipeController.newRecipePage);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipePage);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showOneRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipeController.createRecipe);
app.post('/recipes/:id', controllers.recipeController.editRecipe);
app.post('/recipes/:id/delete', controllers.recipeController.deleteRecipe);
app.get('/me/recipes', middlewares.auth(), controllers.recipeController.myRecipesPage);
app.get('/me/edit', middlewares.auth(), controllers.userController.editUserPage);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipePage);
app.post('/me', middlewares.auth(), controllers.userController.editUser);

app.get('/signup', controllers.userController.SignUpPage);
app.post('/signup', controllers.userController.signUp);

app.listen(3000, () => console.log('Listening on 3000'));
