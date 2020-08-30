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

// app.get('/', (_req, res) => {

//   return res.render('home');
// });

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/me/edit', middlewares.auth(), controllers.userController.editUserDataForm);
app.get('/login', middlewares.auth(false), controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/', middlewares.auth(false), controllers.recipesController.homePage);
app.get('/cadastro', middlewares.auth(false), controllers.registerController.register);
app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.searchPage);
app.get('/recipes/new', middlewares.auth(), controllers.recipesController.newRecipePage);
app.get('/me/recipes', middlewares.auth(), controllers.recipesController.mineRecipesPage);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.detailsPage);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipePage);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipeForm);
app.post('/login', middlewares.auth(false), controllers.userController.login);
app.post('/cadastro', middlewares.auth(false), controllers.registerController.registerForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.updateRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipesController.addRecipe);
app.post('/me', middlewares.auth(), controllers.registerController.editUserInfo);


app.listen(3000, () => console.log('Listening on 3000'));
