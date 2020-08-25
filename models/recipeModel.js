const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => {
      const data = results.fetchAll();
      console.log(data);
      return data;
    })
    .then((recipes) =>
      recipes.map(([id, user, name, ingredients, instructions]) => ({
        id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = {
  getAll,
};
