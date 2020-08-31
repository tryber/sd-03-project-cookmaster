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

app.get('/signup', controllers.signUpController.renderSignUp);
app.post('/signup', controllers.signUpController.newUser);

app.post('/recipes', middlewares.auth(false), controllers.recipeController.addRecipe);
app.get('/recipes/new', middlewares.auth(false), controllers.recipeController.renderRecipeForm);
app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.renderSearch);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetails);
app.post('/recipes/:id', middlewares.auth(false), controllers.recipeController.updateRecipe);
app.get('/recipes/:id/edit', middlewares.auth(false), controllers.recipeController.renderEditRecipeForm);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
