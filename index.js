require('dotenv/config');
// const recipeModel = require('./models/recipeModel'); // provisoriamente aqui para testes

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

app.get('/', middlewares.auth(false), controllers.recipeController.showResume);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', middlewares.auth(false), controllers.userController.loginForm);
app.get('/logout', middlewares.auth(), controllers.userController.logout);
app.post('/login', middlewares.auth(false), controllers.userController.login);

// Ref. Linhas acima do endPoint /login
app.get('/signin', middlewares.auth(false), controllers.userController.signinForm);
app.post('/signin', middlewares.auth(false), controllers.userController.signin);

app.get('/edit', middlewares.auth(), (req, res) => {
  const user = req.user;
  return res.render('edit', { message: null, user });
});
app.get('/delete', middlewares.auth(), (req, res) => {
  const user = req.user;
  return res.render('delete', { message: null, user });
});

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.showResumeMine);
app.get('/recipes/new', middlewares.auth(), (req, res) => {
  const user = req.user;
  return res.render('recipeNew', { message: null, user, result: null });
});
app.get('/recipes/:id/edit', middlewares.auth(false), controllers.recipeController.ableToUpdateRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showRecipe);
app.get('/recipes/search', middlewares.auth(false), (req, res) => {
  const user = req.user;
  return res.render('search', { message: null, user, result: null });
});
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.updateRecipe);
app.post('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipeController.insertRecipe);

app.listen(3000, () => console.log('Listening on 3000'));
