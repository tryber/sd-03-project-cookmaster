const connect = require('./connect');

const findRecipeById = async (id) => {
  return connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(["id", "user", "name", "ingredients", "instructions"])
        .where("id = :id")
        .bind("id", id)
        .execute()
    )
    .then((results) => 
      results.fetchOne()
    )
    .then(([id, email, name, ingredients, instructions]) => (
      {
        id,
        email,
        name,
        ingredients,
        instructions,
      }
    ));
};

const excludeRecipe = async (id) =>
    connect()
    .then((db) =>
      db
        .getTable('recipes')
        .delete()
        .where("id = :id")
        .bind("id", id)
        .execute()
  );

module.exports = {
  findRecipeById,
  excludeRecipe,
};
