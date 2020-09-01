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

app.get('/', middlewares.auth(false), controllers.recipesController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.login);
app.get('/login', controllers.userController.loginForm);
app.get('/register', middlewares.auth(false), controllers.userController.registerForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);
app.post('/register', middlewares.auth(false), controllers.userController.registerUser);

app.get(
  '/recipes/search',
  middlewares.auth(false),
  controllers.recipesController.listsharchRecipes,
);
app.get('/recipes/new', middlewares.auth(), controllers.recipesController.formRecipe);

app.post('/recipes/new', middlewares.auth(), controllers.recipesController.newRecipes);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.listRecipesById);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.editRecipe);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.formEditRecipe);

app.get('/user/recipes', middlewares.auth(), controllers.recipesController.getUserRecipe);

app.listen(3001, () => console.log('Listening on 3000'));
