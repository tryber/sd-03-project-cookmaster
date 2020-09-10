const connection = require('./connection');

const getAll = async () =>
  // seleciona todas as receitas
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute()) // tenta pegar o id o usuario e o nome.
    .then((results) => results.fetchAll()) // tenta retornar um array do banco de dados
    .then((
      results, // tenta fazer um map
    ) =>
      results.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

module.exports = {
  getAll,
};
