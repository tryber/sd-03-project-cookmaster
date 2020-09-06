const connect = require('./connect');

const findChangeRecipeById = async (idS) => (
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idS')
        .bind('id', idS)
        .execute(),
    )
    .then((results) =>
      results.fetchOne(),
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
    ))
);

const alterRecipe = async (id, name, ingredients, instructions) => (
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', ingredients)
        .set('instructions', instructions)
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
);

module.exports = {
  findChangeRecipeById,
  alterRecipe,
};
