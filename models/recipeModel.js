const connection = require('./connection');

const allRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const findById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

const queryRecipe = async (query) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${query}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const createNewRecipe = async (userId, user, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );

const updateRecipe = async (recipeId, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
  );

const getUserRecipes = async (userId) =>
  connection()
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

const deleteRecipe = async (id) =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id).execute(),
  );

module.exports = {
  allRecipes,
  findById,
  queryRecipe,
  createNewRecipe,
  updateRecipe,
  getUserRecipes,
  deleteRecipe,
};
