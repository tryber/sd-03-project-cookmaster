const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('recipes').select(['user', 'name', 'ingredients', 'instructions']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([user, name, ingredients, instructions]) => ({ user, name, ingredients, instructions })));

const getRecipeById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll()[0])
    .then(([user, name, ingredients, instructions] = []) => (name ? { user, name, ingredients, instructions } : null));

const add = (name, user) =>
  connect().then((db) =>
    db.getTable('recipes').insert(['user', 'name', 'ingredients', 'instructions']).values(name, user).execute()
  );

const isValid = (user, name, ingredients, instructions) =>
  typeof name === 'string' &&
  user &&
  ingredients &&
  instructions;

module.exports = {
  getAll,
  getRecipeById,
  add,
  isValid
}; 
