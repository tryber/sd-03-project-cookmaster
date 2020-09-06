const connect = require('./connect');

const findChangeRecipeById = async (id) => {
  return connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(["id", "user_id", "user", "name", "ingredients", "instructions"])
        .where("id = :id")
        .bind("id", id)
        .execute()
    )
    .then((results) => 
      results.fetchOne()
    )
    .then(([id, userId, email, name, ingredients, instructions]) => (
      {
        id,
        userId,
        email,
        name,
        ingredients,
        instructions,
      }
    ));
};

const alterRecipe = async (id, name, ingredients, instructions) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set("name", name)
        .set("ingredients", ingredients)
        .set("instructions", instructions)
        .where("id = :id")
        .bind("id", id)
        .execute()
    )

module.exports = {
  findChangeRecipeById,
  alterRecipe,
};
