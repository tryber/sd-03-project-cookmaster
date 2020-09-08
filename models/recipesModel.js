const connect = require('./connection');

const getRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['user', 'name'])
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([user, nameRecipe]) => ({
    user,
    nameRecipe,
  })));

module.exports = {
  getRecipes,
};
