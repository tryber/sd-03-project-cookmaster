const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const findRecipeById = async (id) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'ingredients', 'instructions', 'id'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchOne())
    .then(([name, user, ingredients, instructions, ...userData]) =>
      ({ name, user, ingredients, instructions, id: userData.id }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const findRecipeByName = async (input) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .where('name like :input')
      .bind('input', `%${input}%`)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const createRecipe = ({ userId, user, name, ingredients, instructions }) =>
    connection()
      .then((db) => db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(userId, user, name, ingredients, instructions)
        .execute())
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });

const invalidRecipe = ({ name, ingredients, instructions }) => {
  if (!name || !ingredients || !instructions) return true;
  return false;
};
module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipeByName,
  createRecipe,
  invalidRecipe,
};
