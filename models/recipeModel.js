const connection = require('./connection');

const getRecipeList = async () => (
  connection()
    .then((schema) => schema
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    })))
);

const getRecipeById = async (id) => (
  connection()
    .then((schema) => schema
      .getTable('recipes')
      .select(['user_id', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then(([userId, name, ingredients, instructions]) => ({
      userId,
      name,
      ingredients,
      instructions,
    }))
);

const getRecipeBySearch = async (query) => (
  connection()
    .then((schema) => schema
      .getTable('recipes')
      .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('name like :name')
      .bind('name', `%${query}%`)
      .execute())
    .then((results) => results.fetchAll())
    .then(([userId, user, name, ingredients, instructions]) => ({
      userId,
      user,
      name,
      ingredients,
      instructions,
    }))
);

const insertRecipe = async (userId, ownerUser, name, ingredients, instructions) => (
  connection()
    .then((schema) => schema
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, ownerUser, name, ingredients, instructions)
      .execute())
);

module.exports = {
  getRecipeList,
  getRecipeById,
  getRecipeBySearch,
  insertRecipe,
};
