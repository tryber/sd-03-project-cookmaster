const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((recipes) => recipes.objects);

const findRecipeById = async (id) =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((recipes) => recipes.objects.filter((recipe) => recipe.id === parseInt(id, 10)))
    .then((recipes) => recipes[0]);

const findRecipeByName = async (input) =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((results)=> results.objects)
    .then((recipes) =>
      (input === ''
        ? recipes
        : recipes.filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()))
      )
    );

module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipeByName,
};
