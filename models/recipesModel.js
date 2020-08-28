const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })));

const findRecipeById = async (id) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'ingredients', 'instructions', 'id'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchOne())
    .then(([name, user, ingredients, instructions, ...user]) =>
      ({ name, user, ingredients, instructions, id: user.id }));

const findRecipeByName = async (input) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .where('name like :input')
      .bind('input', `%${input}%`)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })));

module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipeByName,
};
