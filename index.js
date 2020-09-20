const express = require('express');
// Valeu Nato e Gabriel Oliveira
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
  console.log(`${JSON.stringify(req.body)} ${''}`);

  next();
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), controllers.homeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  console.log(req);
  return res.render('admin/home', { user: req.user });
});

app.get('/login', rescue(controllers.userController.loginForm));
app.get('/logout', rescue(controllers.userController.logout));
app.post('/login', rescue(controllers.userController.login));

app.get('/signup', rescue(controllers.userController.signup));
app.post('/signup', rescue(controllers.userController.userSignUp));

app.get('/recipes/search', middlewares.auth(false), rescue(controllers.homeController.searchRecipe));

app.get('/recipes/new', middlewares.auth(), rescue(controllers.homeController.newRecipe));
app.post('/recipes', middlewares.auth(), rescue(controllers.homeController.saveRecipe));

app.get('/recipes/:id/edit', middlewares.auth(), rescue(controllers.homeController.editById));

app.get('/recipes/:id', middlewares.auth(false), rescue(controllers.homeController.checkById));
app.post('/recipes/:id', middlewares.auth(), rescue(controllers.homeController.updateById));

app.get('/recipes/:id/delete', middlewares.auth(), rescue(controllers.homeController.consultDelete));
app.post('/recipes/:id/delete', middlewares.auth(), rescue(controllers.homeController.confirmDelete));

app.get('/me/recipes', middlewares.auth(), rescue(controllers.homeController.myRecipes));

app.get('/me/edit', middlewares.auth(), rescue(controllers.homeController.editUser));
app.post('/me', middlewares.auth(), rescue(controllers.homeController.saveUserEditedData));

app.listen(3000, () => console.log('Listening on 3000'));
