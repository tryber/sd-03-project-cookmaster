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

app.get('/', middlewares.auth(false), controllers.getAllrecipes);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.loginForm);
app.post('/login', controllers.login);
app.get('/logout', controllers.logout);
app.get('/signup', controllers.formSignup);
app.post('/signup', controllers.signup);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeDetails);

app.listen(3000, () => console.log('Listening on 3000'));
