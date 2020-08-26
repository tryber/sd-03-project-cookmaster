const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('recipes').select(
      ['id', 'user_id', 'user', 'name', 'ingredients', 'instructions']
    ).execute())
      .then((results) => results.fetchAll())
      .then((cook) => cook.map(([id, user_id, user, name, ingredients, instructions]) => (
        {id, user_id, user, name, ingredients, instructions}
      )));

module.exports = {
  getAll,
};
