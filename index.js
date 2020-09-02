const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
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

app.get(
  '/register',
  rescue((_req, res) => {
    return res.render('register', { message: null });
  }),
);
app.get('/logout', rescue(controllers.userController.logout));
app.post('/login', rescue(controllers.userController.login));

app.get(
  '/recipes/new',
  middlewares.auth(),
  rescue((_req, res) => res.render('recipes/new', { message: null })),
);
app.post('/recipes/new', rescue(controllers.recipeController.postRecipe));
app.get('/recipes/search', rescue(controllers.searchController.searchRecipe));

app.get('/recipes/:id', middlewares.auth(false), rescue(controllers.recipeController.getRecipe));
app.post('/register', rescue(controllers.userController.registerUser));
app.get('/login', rescue(controllers.userController.loginForm));

app.listen(3000, () => console.log('Listening on 3000'));
