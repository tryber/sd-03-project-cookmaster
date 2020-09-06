const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
const recipeModel = require('./models/recipeModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log(`${JSON.stringify(req.body)} ${''}`);

  next();
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', {
    user: req.user,
  });
});
app.get('/logout', rescue(controllers.userController.logout));
app.post('/login', rescue(controllers.userController.login));

app.get(
  '/recipes/new',
  middlewares.auth(),
  rescue((req, res) => res.render('recipes/new', { message: null, user: req.user })),
);
app.post('/recipes/new', middlewares.auth(), rescue(controllers.recipeController.postRecipe));

app.get(
  '/recipes/search',
  rescue(async (req, res) => {
    console.log('----------------------------------');
    const recipes = await recipeModel.getAllRecipes();
    return res.render('recipes/search', { recipes, user: req.user });
  }),
);
app.post('/recipes/search', rescue(controllers.recipeController.searchRecipe));

app.get('/recipes/:id', middlewares.auth(false), rescue(controllers.recipeController.getRecipe));

app.get('/recipes/:id/edit', middlewares.auth(), rescue(controllers.recipeController.getUpdate));
app.post('/recipes/:id/edit', rescue(controllers.recipeController.postUpdate));

app.get(
  '/recipes/:id/delete',
  middlewares.auth(),
  rescue(controllers.recipeController.confirmDelete),
);
app.post(
  '/recipes/:id/delete',
  middlewares.auth(),
  rescue(controllers.recipeController.deleteRecip),
);

app.post('/register', rescue(controllers.userController.registerUser));

app.get(
  '/register',
  rescue((_req, res) => {
    return res.render('register', { message: null });
  }),
);

app.get('/login', rescue(controllers.userController.loginForm));

app.get('/me/recipes', middlewares.auth(), rescue(controllers.recipeController.getRecipesByUserId));

app.get(
  '/me/edit',
  middlewares.auth(),
  rescue(controllers.userController.getUserEdit),
);

app.post('/me', middlewares.auth(), rescue(controllers.userController.editUser));

app.listen(3000, () => console.log('Listening on 3000'));
