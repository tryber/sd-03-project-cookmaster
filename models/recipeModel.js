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

module.exports = {
  getRecipeList,
  getRecipeById,
};
