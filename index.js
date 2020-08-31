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

app.get('/', middlewares.auth(false), (req, res) => {
  return controllers.queryController.getRecipes(req, res);
});

app.get('/admin', middlewares.auth(true), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', middlewares.auth(false), (req, res) => {
  return controllers.userController.loginForm(req, res);
});

app.get('/logout', middlewares.auth(true), (req, res) => {
  return controllers.userController.logout(req, res);
});

app.post('/login', controllers.userController.login);

// requisição post para cadastrar usuário
app.post('/register', middlewares.auth(false), (req, res) => {
  return controllers.userController.register(req, res);
});

app.listen(3000, () => console.log('Listening on 3000'));
