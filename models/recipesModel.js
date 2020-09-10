const connection = require('./connection');

const recipes = async () =>
  await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select()
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipesRes) => recipesRes);

module.exports = {
  recipes,
};
