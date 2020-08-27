const connection = require('./connection');

const getAll = async () => {
  return connection()
    .then((db) => db.getTable('recipes').select(['name', 'user']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user]) => ({ name, user })));
};

module.exports = {
  getAll,
};