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

app.get('/register', middlewares.auth(false), controllers.userController.registerForm);
app.post('/register', middlewares.auth(false), controllers.userController.registerUser);

app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.listsharchRecipes);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.listRecipesById);

app.get('recipes/new', middlewares.auth(), controllers.recipesController.newRecipes);
app.post('/recipes', middlewares.auth(), controllers.recipesController.newRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.login);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
