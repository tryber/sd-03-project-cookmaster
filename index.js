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

app.get('/users/login', controllers.registerController.registerForm);
app.post('/users/login', controllers.registerController.setRegister);

app.post('/recipes', middlewares.auth(), controllers.recipeController.newRecipePost);
app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipeForm);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.delRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.delRecipePost);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipeForm);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.editRecipePost);

app.get('/recipes/search', controllers.recipeController.recipeQuery);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetails);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.listMyRecipes);
app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
app.post('/me', middlewares.auth(), controllers.userController.editUserPost);

app.listen(3000, () => console.log('Listening on 3000'));
