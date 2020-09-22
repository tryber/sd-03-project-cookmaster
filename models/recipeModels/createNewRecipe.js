const { connect } = require('../connect');

const createNewRecipe = async (userId, user, name, ingredients, instructions) =>
  connect().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );

module.exports = createNewRecipe;
