const { connect } = require('../connect');

const editRecipe = async (recipeId, name, ingredients, instructions) =>
  connect().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
  );

module.exports = editRecipe;
