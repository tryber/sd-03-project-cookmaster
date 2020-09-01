const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    })));


const recipeById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([recipeId, user, name, ingredients, instructions]) => ({
      id: recipeId,
      user,
      name,
      ingredients,
      instructions,
    }));


module.exports = {
  getAllRecipes,
  recipeById,
};
