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
//   if (err) {
//     return console.error('erro: ' + err.message);
//   }

//   console.log('Connected to the MySQL server.');
// });

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => {
  return res.render('home');
});

app.get('/admin', middlewares.auth(), (req, res) => {
  return res.render('admin/home', { user: req.user });
});

app.get('/login', controllers.userController.loginForm);
app.get('/logout', controllers.userController.logout);
app.get('/teste/:id', controllers.userController.idController);
app.post('/login', controllers.userController.login);

app.listen(3000, () => console.log('Listening on 3000'));
