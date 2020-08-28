// Código baseado no exemplo de MVC da aula 27.2.

const connection = require('./connection');

// Joga do banco para a aplicação
const getAllRecipes = async () =>
  connection()
    .then((data) => data
      .getTable('recipes')
      .select(['id', 'name', 'user'])
      .execute())
      .then((results) => results.fetchAll()) // Consome o resultado da promise
      .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));
      // O código acima retorna tudo num array. A última linha passa para objeto

module.exports = { getAllRecipes };
