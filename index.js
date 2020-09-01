require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express({ strict: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.homeController.recipe);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/cadastro', controllers.registerController.registerForms);
app.post('/cadastro', controllers.registerController.register);

app.get('/recipes/new', middlewares.auth(), controllers.newRecipeController.newRecipePage);
app.post('/recipes/new', middlewares.auth(), controllers.newRecipeController.newRecipeInsert);
// app.post('/addIngredient', controllers.newRecipeController.addIngredientContr);

app.get('/recipes/search', middlewares.auth(false), controllers.searchController.search);

app.get('/recipes/:id', middlewares.auth(false), controllers.detailsController.recipe);
app.post('/recipes/:id', middlewares.auth(false), controllers.editRecipeController.editRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.editRecipeController.editRecipePage);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipeController.deleteRecipePage);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipeController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.myRecipesController.myRecipesPage);

app.get('/me/edit', middlewares.auth(), controllers.profileController.profilePage);
app.post('/me', middlewares.auth(), controllers.profileController.profileEdited);

app.get('/login', controllers.userController.loginForm);

app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3001, () => console.log('Listening on 3001'));
