const connect = require('./connect');

const getAll = async () =>
  connect()
    .then((db) => db.getTable('recipes').select(
      ['id', 'user_id', 'user', 'name', 'ingredients', 'instructions']).execute())
      .then((results) => results.fetchAll())
      .then((cook) => cook.map(([id, userId, user, name, ingredients, instructions]) => (
        { id, userId, user, name, ingredients, instructions }
      )));

const getCookieById = async (cookieId) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes').select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', cookieId)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([id, userId, user, name, ingredients, instructions] = []) => (
        userId
          ?
        { id, userId, user, name, ingredients, instructions }
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

const getMyFoods = async (param, tableVal) =>
connect()
  .then((db) =>
    db
      .getTable('recipes').select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where(`${tableVal} = :user_id`)
      .bind('user_id', param)
      .execute(),
    )
    .then((results) => results.fetchAll())
    .then((cook) => cook.map(([id, usrId, user, name, ingredients, instructions] = []) => (
      usrId
        ?
      { id, usrId, user, name, ingredients, instructions }
        :
      null)));

const setNewRecipes = async (recipeVal, { id, firstName, lastName }, ing) =>
  connect()
    .then((db) => db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, `${firstName} ${lastName}`, recipeVal.name, ing, recipeVal.instructions)
    .execute());

const changeRecipe = async ({ name, instructions }, id, ingredients) =>
  connect()
    .then((db) => db.getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  getAll,
  getCookieById,
  getCookieByName,
  setNewRecipes,
  changeRecipe,
  getMyFoods,
};
