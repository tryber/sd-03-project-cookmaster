const connect = require('./connect');

const getAll = () =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

// getAll().then((res) => console.log(res));

module.exports = {
  getAll
}
