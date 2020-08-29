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

app.get('/', middlewares.auth(false), controllers.userAuth.recipesAuth);

app.get('/admin', middlewares.auth(true), controllers.userAuth.recipesAuth, (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.use('/recipes', controllers.recipesController.router);
app.get('/login', controllers.userController.loginForm);

app.get('/register', controllers.userController.renderForm);
app.post('/register', controllers.userController.createUser);

app.get('/logout', controllers.userController.logout);
app.post('/login', controllers.userController.login);

app.use('/me', controllers.userInfoController.router);

app.get('*', (_req, res) => res.send('Página não encontrada.'));

app.listen(3000, () => console.log('Listening on 3000'));

// projeto feito com base em https://github.com/tryber/sd-02-project-cookmaster/pull/1
