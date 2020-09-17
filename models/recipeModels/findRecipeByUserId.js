const connect = require('../connect');

const findRecipesByUserId = async (userId) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([recipeId, user, name]) => ({
        id: recipeId,
        user,
        name,
      })),
    );

module.exports = findRecipesByUserId;
