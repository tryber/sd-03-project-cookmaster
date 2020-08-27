const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const getRecipes = require('./controllers');
const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views/admin');
app.get('/', getRecipes.userController.renderRecipes);
app.get('/register', controllers.userController.registerForm);
app.post('/register', controllers.userController.saveUser);
app.get('/recipe/:id', middlewares.auth(false), controllers.userController.showRecipeInfo);
app.get('/admin', middlewares.auth(), controllers.userController.renderAdmin);
app.get('/recipes/search', controllers.userController.searchRecipe);
app.post('/recipes', middlewares.auth(), controllers.userController.saveNewRecipe);
app.get('/recipes', getRecipes.userController.renderRecipes);
app.get('/recipes/new', middlewares.auth(), controllers.userController.addRecipe);
app.post('/recipes/new', middlewares.auth(), controllers.userController.removeItem);
app.get('/recipes/:id/edit', middlewares.auth(), controllers.userController.findRecipeToEdit);
app.post('/recipes/:id/edit', middlewares.auth(), controllers.userController.editIngredients);
app.post('/recipes/:id', middlewares.auth(), controllers.userController.updateRecipe);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.userController.showPassConfirm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.userController.deleteRecipe);
app.get('/me/recipes', middlewares.auth(), controllers.userController.showMyRecipes);
app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
