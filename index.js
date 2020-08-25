const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const { userController, recipeController } = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  const recipes = await recipeController.listRecipes();
  return res.render('home', { recipes, login: null, id: 1 });
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app
  .route('/register')
  .get((_req, res) => {
    res.status(200).render('register');
  })
  .post(middlewares.verifyRegister, (_req, res) => {
    res.status(200).render('login', { message: 'Cadastro efetuado com sucesso!' });
  });

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
