const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('recipes').select(
      ['id', 'user_id', 'user', 'name', 'ingredients', 'instructions']).execute())
      .then((results) => results.fetchAll())
      .then((cook) => cook.map(([id, userId, user, name, ingredients, instructions]) => (
        { id, userId, user, name, ingredients, instructions }
      )));

const getCookieById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes').select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([userId, user, name, ingredients, instructions] = []) => (
        userId
          ?
        { userId, user, name, ingredients, instructions }
          :
        null));

const getCookieByName = async (foodName) =>
connect()
  .then((db) =>
    db
      .getTable('recipes').select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('name = :name')
      .bind('name', foodName)
      .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([userId, user, name, ingredients, instructions] = []) => (
      userId
        ?
      { userId, user, name, ingredients, instructions }
        :
      null));

const setNewRecipes = async (recipeVal, { id, firstName, lastName }) =>
  connect()
    .then((db) => db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, `${firstName} ${lastName}`, recipeVal.name, recipeVal.ingredient, recipeVal.instructions)
    .execute());

module.exports = {
  getAll,
  getCookieById,
  getCookieByName,
  setNewRecipes,
};
