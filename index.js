// Para rodar o projeto usando o nodemon (reinicia o servidor a cada save), use npn run start:watch
// Para executar os testes, rode npm run cypress:open
// Verifique no package.json os scripts, o lado esquerdo é o comando e o direito

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);
app.get('/me', middlewares.auth(false), controllers.recipeController.listRecipes);
app.get('/recipes', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.searchByName);
app.post('/recipes/', middlewares.auth(), controllers.recipeController.addRecipe);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/recipes/new', middlewares.auth(), (req, res) => {
  return res.render('newRecipe', { user: req.user });
});

app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetail);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipe);
app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.updateRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.confirmDeleteForm);
app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);

app.post('/me', middlewares.auth(), controllers.userController.update);
app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
app.get('/me/recipes', middlewares.auth(), controllers.recipeController.searchByUser);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/register', controllers.userController.regForm);
app.post('/login', controllers.userController.login);
app.post('/register', controllers.userController.register);

app.listen(3000, () => console.log('Listening on 3000'));
