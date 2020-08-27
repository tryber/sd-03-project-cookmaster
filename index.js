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

app.get('/', middlewares.auth(false), controllers.homeController.home);

app.get('/cadastro', (req, res) => res.render('admin/signin', { message: '' }));
app.post('/cadastro', controllers.userController.singIn);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));
app.get('/recipes/search', controllers.recipesController.searchRecipes);
app.get('/recipes/new', middlewares.auth(), controllers.recipesController.newRecipe);
app.post('/recipes', middlewares.auth(), controllers.recipesController.newRecipePOST);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.recipesDescription);
app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.editRecipePOST);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipePOST);

app.get('/me/recipes', middlewares.auth(), controllers.recipesController.myRecipes);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
