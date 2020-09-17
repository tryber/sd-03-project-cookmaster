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

app.get('/', middlewares.auth(false), controllers.list);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.loginForm);
app.get('/logout', controllers.logout);
app.get('/signup', controllers.formSignup);
app.post('/login', controllers.login);
app.post('/signup', controllers.signup);

app.get('/recipes/search', middlewares.auth(false), controllers.search);
app.get('/recipes/new', middlewares.auth(), controllers.newRecipeForm);

app.post('/recipes', middlewares.auth(), controllers.newRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.details);
app.post('/recipes/:id', middlewares.auth(), controllers.edit);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.editRecipeForm);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), controllers.getUser);
app.get('/me/edit', middlewares.auth(), controllers.editUserForm);
app.post('/me', middlewares.auth(), controllers.edit);

app.listen(3000, () => console.log('Listening on 3000'));
