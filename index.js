require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeRecipes = require('./routeRecipes');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/recipes', routeRecipes);

app.get('/', middlewares.auth(false), controllers.cookController.listCook);

app.get('/me/recipes', middlewares.auth(), controllers.userController.myRecipes);
app.get('/admin', middlewares.auth(), controllers.cookController.admin);

app.get('/login', controllers.userController.loginForm);
app.post('/login', controllers.userController.login);
app.post('/signup', controllers.userController.signup);
app.get('/signup', controllers.userController.signupForm);
app.get('/logout', controllers.userController.logout);

app.use((err, _req, res, next) => {
  next(err);
  res.status(500).send('Something broke!');
});

app.listen(3333, () => console.log(process.env.HOSTNAME));
