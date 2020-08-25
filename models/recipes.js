const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('recipes').select(['name', 'user']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user]) => ({ name, user })));

const getRecipeById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['name', 'user'])
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll()[0])
    .then(([name, user] = []) => (name ? { name, user } : null));

const add = (name, user) =>
  connect().then((db) =>
    db.getTable('recipes').insert(['name', 'user']).values(name, user).execute()
  );

const isValid = (name, user) =>
  typeof name === 'string' &&
  name.length >= 3 &&
  name.length < 30 &&
  user &&
  user;

module.exports = {
  getAll,
  getRecipeById,
  add,
  isValid
}; 
