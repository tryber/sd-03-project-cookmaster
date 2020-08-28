const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((recipes) => recipes.objects);

const findRecipeById = async (id) =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((recipes) => recipes.objects.filter((recipe) => recipe.id === parseInt(id)))
    .then((recipes) => recipes[0])

module.exports = {
  findAllRecipes,
  findRecipeById,
};
