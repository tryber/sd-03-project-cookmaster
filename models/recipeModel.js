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
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((res) => res.fetchAll()[0])
  .then(([recipeId, userId, userName, recipeName, ingredients, instructions]) => ({
    recipeId,
    userId,
    userName,
    recipeName,
    ingredients,
    instructions,
  }));

const findRecipes = async (q) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${q}%`)
    .execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes
    .map(([id, user, name]) => ({
      id,
      user,
      name,
    })));

module.exports = { getAllRecipes, getRecipeById, findRecipes };
