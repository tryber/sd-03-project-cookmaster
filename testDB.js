const connection = require('./models/DbConnection');

connection().then((session) => {
  console.log('Conectado ao MySQL!');
});