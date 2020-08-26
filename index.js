require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const { userController, recipeController } = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
  console.info(req.path);
  next();
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), async (req, res) => {
  const { id } = req.user || {};
  const recipes = await recipeController.listRecipes();
  return res.render('home', { recipes, login: id });
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.route('/register')
  .get(
    (_req, res) => {
      res.status(200).render('register', { message: null });
    },
  ).post(middlewares.verifyRegister, (_req, res) => {
    res.status(200).render('register', { message: 'Cadastro efetuado com sucesso!' });
  });

app.route('/recipes/search')
  .get(recipeController.getRecipesByName);

app.route('/recipes/new')
  .get(
    middlewares.auth(true),
    (_req, res) => {
      res.status(200).render('createRecipe');
    },
  ).post(
    middlewares.auth(true),
    recipeController.createRecipe,
    (_req, res) => {
      res.status(200).render('createRecipe');
    },
  );


app.route('/recipes/:id')
  .get(
    middlewares.auth(false),
    recipeController.recipePermission,
    recipeController.recipeDetails,
  );

app.route('/recipes/:id/edit')
  .get(
    middlewares.auth(true),
    recipeController.recipePermission,
    recipeController.editRecipe,
  );

app.route('/me/recipe')
  .get(
    middlewares.auth(true),
    // userController.getSelfRecipes,
    /* Own Recipes */
  );

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
