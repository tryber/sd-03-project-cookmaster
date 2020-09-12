const connection = require('./connection');

const getAll = async () =>
connection()
  .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));

const getRecipeById = async (id) =>
connection()
  .then((db) =>
    db
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute(),
  )
  .then((results) => results.fetchAll()[0])
  .then(([id, userId, user, name, ingredients, instructions]) =>
  ({ id, userId, user, name, ingredients, instructions }))
  .catch((err) => {
    console.error(err);
  });

module.exports = {
  getAll,
  getRecipeById,
};
