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

app.get('/', middlewares.auth(false), controllers.recipesController.recipesList);


app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);
app.get('/createuser', controllers.userController.createUserForm);
app.post('/createuser', controllers.userController.createUser);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipeForm);

app.get('/recipeDetail/:id', middlewares.auth(false), controllers.recipesController.recipeByid);


app.post('/recipesEdit/:id', middlewares.auth(), controllers.recipesController.editRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipeForm);
app.post('/recipesDelete/:id', middlewares.auth(), controllers.recipesController.deleteRecipe);

app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.searchRecipe);

app.get('/recipes/new', middlewares.auth(false), controllers.recipesController.newRecipeForm);

app.post('/recipes', middlewares.auth(), controllers.recipesController.newRecipe);

app.get('/recipes/edit', middlewares.auth(false), controllers.recipesController.editRecipeForm);

app.post('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.recipesController.getUserRecipes);

app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);

app.post('/me', middlewares.auth(), controllers.userController.editUser);


app.listen(3000, () => console.log('Listening on 3000'));
