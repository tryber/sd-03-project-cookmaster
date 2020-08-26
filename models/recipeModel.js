const connection = require('./connection');

const getRecipeList = async () => (
  connection()
    .then((schema) => schema
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    })))
);

module.exports = {
  getRecipeList,
};
