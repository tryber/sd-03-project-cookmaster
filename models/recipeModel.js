const connect = require('./connection');

const resumeAllRecipes = () =>
  connect()
  .then((db) => db.getTable('recipes').select(['name', 'user', 'id']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
;

const getAllRecipes = () =>
  connect()
  .then((db) => db.getTable('recipes').select(['id', 'user', 'name', 'ingredients', 'instructions']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) =>
    recipes.map(([id, user, name, ingredients, instructions]) => ({
      id,
      user,
      name,
      ingredients,
      instructions,
    })),
  );

const getRecipe = (id) =>
  connect()
  .then((db) => db.getTable('recipes').select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((recipe) => recipe.fetchAll()[0]);

// Ref. https://dev.mysql.com/doc/x-devapi-userguide/en/parameter-binding.html */
const searchRecipe = (query) =>
  connect()
  .then((db) => db.getTable('recipes')
  .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
  .where('name like :query')
  .bind('query', `%${query}%`)
  .execute())
  .then((results) => results.fetchAll())
  .then((recipes) =>
    recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    })),
);

const updateRecipe = (id, name, ingredients, instructions) =>
  connect()
  .then((db) => db.getTable('recipes')
  .update()
  .set('name', name)
  .set('ingredients', ingredients)
  .set('instructions', instructions)
  .where('id = :id')
  .bind('id', id)
  .execute())
  .then( () => ({name, ingredients, instructions}));

const insertRecipe = (userId, user, name, ingredients, instructions) =>
  connect()
  .then((db) => db.getTable('recipes')
  .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
  .values([userId, user, name, ingredients, instructions])
  .execute())
  .then(() => ({ userId, user, name, ingredients, instructions }));

module.exports = {
  resumeAllRecipes,
  getAllRecipes,
  getRecipe,
  searchRecipe,
  updateRecipe,
  insertRecipe,
};
