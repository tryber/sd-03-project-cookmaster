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

app.get('/', middlewares.auth(false), controllers.recipeController.showAllRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/recipes/new', middlewares.auth(), (req, res) => {
  return res.render('admin/newRecipe', { user: req.user });
});

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipes);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showRecipeDetails);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/signup', (_req, res) => {
  res.render('admin/signup', { message: null, redirect: null })
});


app.post('/login', controllers.userController.login);
app.post('/signup', controllers.userController.signup);
//app.post('/recipes', controllers.userController.newRecipe)

app.listen(3000, () => console.log('Listening on 3000'));
