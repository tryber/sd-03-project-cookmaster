const connection = require('./connection');

const addRecipe = async (userId, userName, recipeName, ingredients, instructions) =>
  connection().then((
    db, // cria uma receita nova
  ) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, userName, recipeName, ingredients, instructions)
      .execute(),
  );

module.exports = {
  addRecipe,
};
