const connect = require('./connection');

const getRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, nameRecipe]) => ({
    id,
    user,
    nameRecipe,
  })));

const getRecipesById = async (recipeId) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  }))[0]);

module.exports = {
  getRecipes,
  getRecipesById,
};
