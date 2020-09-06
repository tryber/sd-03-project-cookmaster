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

app.get('/', middlewares.auth(false), controllers.recipeController.callRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/users/login', controllers.registerController.registerForm);
app.post('/users/login', controllers.registerController.setRegister);

app.get('/recipes/new', middlewares.auth(), controllers.registerRecipeController.enterNewRecipes);
app.post('/recipes', middlewares.auth(), controllers.registerRecipeController.addNewRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.searchController.callSearchRecipes);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.excludeController.reciveExcludeForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.excludeController.excludeForm);

app.get(
  '/recipes/:id/edit',
  middlewares.auth(),
  controllers.changeRecipeController.reciveDetailsForm,
);
app.post('/recipes/:id', middlewares.auth(), controllers.changeRecipeController.changeDetailsForm);

app.get(
  '/recipes/:id',
  middlewares.auth(false),
  controllers.recipeDetailsController.recipeDetailsForm,
);

app.get(
  '/me/edit',
  middlewares.auth(),
  controllers.changeUserController.registerUserForm,
);
app.post('/me', middlewares.auth(), controllers.changeUserController.setUserChange);

app.get('/me/recipes', middlewares.auth(), controllers.myRecipesController.callMyRecipes);

app.listen(3000, () => console.log('Listening on 3000'));
