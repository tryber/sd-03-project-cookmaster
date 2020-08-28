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

// app.get('/', (_req, res) => {

//   return res.render('home');
// });

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', middlewares.auth(false), controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/', middlewares.auth(false), controllers.recipesController.homePage);
app.get('/cadastro', middlewares.auth(false), controllers.registerController.register)
app.post('/login', middlewares.auth(false), controllers.userController.login);
app.post('/cadastro', middlewares.auth(false), controllers.registerController.registerForm);

app.listen(3000, () => console.log('Listening on 3000'));
