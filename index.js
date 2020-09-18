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

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/register', controllers.userController.register);
app.post('/register', controllers.userController.register);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchRecipes);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.rendNew);
app.post('/recipes', middlewares.auth(), controllers.recipeController.newRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.rendDel);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.delRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.rendEdit);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.editRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetail);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.userRecipes);

app.get('/me/edit', middlewares.auth(), controllers.userController.rendEditUser);
app.post('/me', middlewares.auth(), controllers.userController.editUser);

app.listen(3000, () => console.log('Listening on 3000'));
