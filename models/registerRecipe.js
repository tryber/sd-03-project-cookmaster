const connect = require('./connect');

const addRecipe = async (id, user, name, ingredients, instructions) => 
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(["user_id", "user", "name", "ingredients", "instructions"])
        .values(id, user, name, ingredients, instructions)
        .execute()
  );

module.exports = {
  addRecipe,
};