require('dotenv/config');
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

app.get('/', controllers.cookController.listCook);

app.get('/admin', middlewares.auth(), controllers.cookController.admin);

app.get('/login', controllers.userController.loginForm);
app.post('/login', controllers.userController.login);
app.post('/signup', controllers.userController.signup);
app.get('/signup', controllers.userController.signupForm);
app.get('/recipes/new', middlewares.auth(), controllers.cookController.newRecipe)
app.get('/recipes/:id', middlewares.auth(false), controllers.cookController.cooks);
app.get('/logout', controllers.userController.logout);

app.listen(3000, () => console.log(process.env.HOSTNAME));
