const connect = require('./connection');

const resumeAllRecipes = () =>
  connect()
  .then((db) => db.getTable('recipes').select(['name', 'user']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([name, user]) => ({ name, user })))
;

const getAllRecipes = () =>
  connect()
  .then((db) => db.getTable('recipes').select(['id', 'user', 'name', 'ingredients', 'instructions']).execute())
  .then((results) => results.fetchAll())
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
  resumeAllRecipes,
  getAllRecipes,
};
