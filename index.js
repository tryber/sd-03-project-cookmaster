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

app.get('/', middlewares.auth(false), controllers.homeController.listRecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  console.log(req);
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.get('/signup', controllers.userController.signup);
app.post('/signup', controllers.userController.createUser);

app.get('/recipes/search', middlewares.auth(false), controllers.homeController.searchRecipe);

app.get('/recipes/new', middlewares.auth(), controllers.homeController.newRecipe);
app.post('/recipes', middlewares.auth(), controllers.homeController.saveRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), controllers.homeController.editById);

app.get('/recipes/:id', middlewares.auth(false), controllers.homeController.checkById);
app.post('/recipes/:id', middlewares.auth(), controllers.homeController.updateById);



app.listen(3000, () => console.log('Listening on 3000'));
