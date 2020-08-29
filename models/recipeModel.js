const connect = require('./connection');

const resumeAllRecipes = () =>
  connect()
  .then((db) => db.getTable('recipes').select(['name', 'user', 'id']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
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

const getRecipe = (id) =>
  connect()
  .then((db) => db.getTable('recipes').select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((recipe) => recipe.fetchAll()[0]);

module.exports = {
  resumeAllRecipes,
  getAllRecipes,
  getRecipe,
};
