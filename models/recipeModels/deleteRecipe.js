const { connect } = require('../connect');

const deleteRecipeModel = async (id) =>
  connect().then((db) =>
    db.getTable('recipes')
    .delete()
    .where('id = :id')
    .bind('id', id)
    .execute(),
  );

module.exports = deleteRecipeModel;
