const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user_id, user, name]) => ({ id, user_id, user, name })));

const findRecipeById = async (ids) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', ids)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) =>
      recipe.map(([id, user_id, user, name, ingredients, instructions]) => ({
        id,
        user_id,
        user,
        name,
        ingredients,
        instructions,
      }))
    );

module.exports = {
  getAll,
  findRecipeById,
};
