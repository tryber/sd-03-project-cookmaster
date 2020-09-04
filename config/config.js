require('dotenv/config');

// Faça essas configurações também para as variáveis de ambiente usadas nesses arquivos:
// sd-03-project-cookmaster/config/config.js
// Neste arquivo e obrigatório deixar o nome do database como "database": 'cookmaster'

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": "cookmaster",
    "host": process.env.HOSTNAME,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": "cookmaster",
    "host": process.env.HOSTNAME,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": "cookmaster",
    "host": process.env.HOSTNAME,
    "dialect": "mysql"
  }
};
