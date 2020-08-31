const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    })));

module.exports = {
  getAllRecipes,
};
