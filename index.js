const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { connection } = require('./database');

const middlewares = require('./middlewares');
const controllers = require('./controllers');
// const userModel = require('./models/userModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// connection.connect((err) => {
//   const cc = 'erro: ';
//   if (err) {
//     return console.error(cc + err.message);
//   }

//   console.log('Connected to the MySQL server.');
// });

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  return res.render('home', { user: middlewares.getUser(req) });
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});
app.get('/register', middlewares.auth(false), (_req, res) => {
  return res.render('cadastro', { message: null });
});
app.post('/newUser', middlewares.auth(false), controllers.userController.formSubmit);

app.get('/recipes/search', (_req, res) => {
  return res.render('admin/search');
});
app.get('/recipes/teste', (_req, res) => {
  return res.render('admin/recipe');
});
app.get('/recipes/teste/delete', (_req, res) => {
  return res.render('admin/deleteRecipe');
});

app.get('/recipes/modify', (_req, res) => {
  return res.render('admin/modifyRecipe');
});


app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
