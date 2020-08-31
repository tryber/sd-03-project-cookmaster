const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, userId, user, name]) => ({ id, userId, user, name })));

const findRecipeById = async (ids) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', ids)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) =>
      recipe.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const findRecipeByQuery = async (q) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name LIKE :name')
        .bind('name', `%${q}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const insertNewRecipe = async (idUser, userName, recipeName, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(idUser, userName, recipeName, ingredients, instructions)
      .execute(),
  );

const updateRecipe = async (recipeId, recipeName, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :recipeId')
      .bind('recipeId', recipeId)
      .execute(),
  );

module.exports = {
  getAll,
  findRecipeById,
  findRecipeByQuery,
  insertNewRecipe,
  updateRecipe,
};
