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

app.get('/', middlewares.auth(false), (req, res) => {
  return controllers.queryController.getRecipes(req, res);
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', middlewares.auth(false), (req, res) => {
  return controllers.userController.loginForm(req, res);
});

app.get('/logout', middlewares.auth(), (req, res) => {
  return controllers.userController.logout(req, res);
});

app.get('/register', (req, res) => {
  return controllers.userController.registerForm(req, res);
});

app.get('/recipes/search', (req, res) => {
  return controllers.queryController.searchRecipes(req, res);
});

app.get('/recipes/new', middlewares.auth(), (req, res) => {
  return controllers.queryController.newRecipeForm(req, res);
});

app.get('/recipes/:id/edit', middlewares.auth(), (req, res) => {
  req.going = 'admin/editRecipe';
  return controllers.queryController.forms(req, res);
});

app.get('/recipes/:id/delete', middlewares.auth(), (req, res) => {
  req.going = 'admin/deleteForm';
  return controllers.queryController.forms(req, res);
});

app.get('/recipes/:id', middlewares.auth(false), (req, res) => {
  return controllers.queryController.getRecipe(req, res);
});

app.get('/me/recipes', middlewares.auth(), (req, res) => {
  return controllers.queryController.getUserRecipes(req, res);
});

app.get('/me/edit', middlewares.auth(), (req, res) => {
  return controllers.userController.updateForm(req, res);
});

app.post('/login', controllers.userController.login);

app.post('/register', middlewares.auth(false), (req, res) => {
  return controllers.userController.register(req, res);
});

app.post('/recipes', middlewares.auth(), (req, res) => {
  return controllers.queryController.newRecipe(req, res);
});

app.post('/recipes/:id/delete', middlewares.auth(), (req, res) => {
  return controllers.queryController.deleteRecipe(req, res);
});

app.post('/recipes/:id', middlewares.auth(), (req, res) => {
  return controllers.queryController.editRecipe(req, res);
});

app.post('/me', middlewares.auth(), (req, res) => {
  return controllers.userController.updateUser(req, res);
})

app.listen(3000, () => console.log('Listening on 3000'));
