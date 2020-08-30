require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const { recipeController } = require('./controllers');

const app = express();

// app.use(bodyParser.text())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set to views
app.set('view engine', 'ejs');
app.set('views', './views');

// gets for routes

app.get('/', middlewares.auth(false), controllers.recipeController.recipes);
app.get('/admin/cadastro', middlewares.auth(false), controllers.userController.registerForm);
app.post('/admin/cadastro', middlewares.auth(false), controllers.userController.register);
app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.findRecipes);

app.get('/recipes/new', middlewares.auth(), controllers.recipeController.createForm);
app.post('/recipes/new', middlewares.auth(), controllers.recipeController.createRecipes);

app.get('/recipes/:id/edit',middlewares.auth(), controllers.recipeController.editRecipe);
app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipesById);
app.post('/recipes/:id', middlewares.auth(), recipeController.editRecipe);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// como acessar o parametro da URL passado ?
// req.params.nomeDoParam > id  || req.query.rota
