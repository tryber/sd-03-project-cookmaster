const connect = require('./connection');

const getAllRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((res) => res.fetchAll())
  .then((res) => res.map(([id, user, name]) => ({
    id,
    user,
    name,
  })));

const getRecipeById = async (id) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((res) => res.fetchAll()[0])
  .then(([recipeId, userName, recipeName, ingredients, instructions]) => ({
    recipeId,
    userName,
    recipeName,
    ingredients,
    instructions,
  }));

module.exports = { getAllRecipes, getRecipeById };
