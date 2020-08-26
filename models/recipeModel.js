const connect = require('./connection');

const getAllRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .execute())
  .then((res) => res.fetchAll())
  .then((res) => res.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  })));

module.exports = { getAllRecipes };
