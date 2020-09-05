// Para rodar o projeto usando o nodemon (reinicia o servidor a cada save), use npn run start:watch

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

require('dotenv').config();

// Anatomia de um middleware - no express, tudo é um middleware
// Recebe esses 3 parâmetros, é executada em um dado momento, pode encerrar a request ou executar o próximo middleware
const middleware = (req, res, next) => {
  // req é a requisição
  // req.params
  // req.query
  // req.body
  // res é a resposta
  // res.status
  // res.json - usado quando mandamos um objeto - logo, converte o que vc mandar para JSON
  // res.send - esse já não faz essa conversão. Deve ser evitado, a menos que nunca se use JSON na API
  // res.end
  // next - passa a requisição para o próximo middleware.
}

const middlewareDeErro = (err, req, res, next) => {
  // Mesma coisa do outro, só que com esse parâmetro extra (err)
  // O valor dele é o que foi passado para a variável next em outro middleware
  // Deve ser o último middleware a ser executado - vir depois dos outros tipos de middleware (só 1)
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

// middlewares.auth() - exige autenticação. Se colocado parâmetro false, dispensa a mesma

app.get('/', middlewares.auth(false), controllers.recipeController.listRecipes);
app.get('/recipes', middlewares.auth(false), controllers.recipeController.listRecipes);

app.get('/recipes/search', middlewares.auth(false), controllers.recipeController.recipeSearch);
app.post('/recipes/', middlewares.auth(), controllers.recipeController.addRecipe);
// app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.addRecipe);

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/recipes/new', middlewares.auth(), (req, res) => {
  return res.render('newRecipe', { user: req.user });
});

app.get('/recipes/:id/edit', middlewares.auth(), (req, res) => {
  return res.render('editRecipe', { user: req.user });
});

app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.editRecipe);
app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.recipeDetail);

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/register', controllers.userController.regForm);
app.post('/login', controllers.userController.login);
app.post('/register', controllers.userController.register);

app.listen(3000, () => console.log('Listening on 3000'));
