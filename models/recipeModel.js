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

const addRecipe = (userId, userName, name, ingredients, instructions) => {
  return connection()
    .then((db) =>
      db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, userName, name, ingredients, instructions)
      .execute(),
    );
}

module.exports = {
  getAll,
  getRecipeById,
  getSearchRecipe,
  addRecipe,
};
