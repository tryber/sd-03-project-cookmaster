const connection = require('./connection');

const getAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));

const getRecipeById = async (Id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', Id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, userId, user, name, ingredients, instructions]) =>
    ({ id, userId, user, name, ingredients, instructions }))
    .catch((err) => { console.error(err); });

const getSearchRecipe = async (Name) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'name', 'user'])
        .where('name like :name')
        .bind('name', Name)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })))
    .catch((err) => { console.error(err); });

const addRecipe = (userId, userName, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, userName, name, ingredients, instructions)
      .execute(),
    );

const updateRecipe = (Id, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', Id)
      .execute(),
    );

const deleteRecipe = (Id) =>
  connection()
    .then((db) =>
      db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', Id)
      .execute(),
    );

const getRecipeByUserId = async (userId) =>
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
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })))
    .catch((err) => { console.error(err); });

module.exports = {
  getAll,
  getRecipeById,
  getSearchRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByUserId,
};
