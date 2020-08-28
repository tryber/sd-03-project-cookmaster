const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((recipes) => recipes.objects);

module.exports = {
  findAllRecipes,
}
