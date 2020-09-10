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

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/', middlewares.auth(false), controllers.recipeController.recipeList);
app.get('/login', controllers.userController.loginForm);
app.post('/login', controllers.userController.login);
app.get('/logout', controllers.userController.logout);

app.get('/signup', middlewares.auth(false), controllers.userController.registerForm);
app.post('/signup', middlewares.auth(false), controllers.userController.registerUser);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.recipeSearch);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.recipeForm);
app.post('/recipes', middlewares.auth(), controllers.recipeController.recipeRegister);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetail);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.recipeUpdateForm);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.recipeUpdate);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.recipeDelete);

app.get('/me/recipes', middlewares.auth(), controllers.recipeController.myRecipeList);

app.get('/me/edit', middlewares.auth(), controllers.userController.userEditForm);
app.post('/me/edit', middlewares.auth(), controllers.userController.userEdit);

app.listen(3000, () => console.log('Listening on 3000'));
