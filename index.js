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

app.get('/recipes/search=q?input', rescue(controllers.searchController.searchRecipe));

app.get('/recipes/:id', middlewares.auth(false), rescue(controllers.recipeController.getRecipe));
app.post('/register', rescue(controllers.userController.registerUser));
app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
