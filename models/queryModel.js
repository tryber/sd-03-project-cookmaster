const connect = require('../models/connection');

const getAllRecipes = async () =>
  connect().then((db) => db
    .getTable('recipes')
    .select()
    .execute(),
    ).then((results) => results.fetchAll());

const getRecipeById = async (id) => {
  try {
    const recipe = await connect()
      .then((db) => db
        .getTable('recipes')
        .select()
        .where('id = :id')
        .bind('id', id)
        .execute()
      )
      .then((results) => results.fetchAll()[0]);
    if (recipe) {
      const recipeObj = ([id, user_id, user, name, ingredients, instructions]) => ({
        id, user_id, user, name, ingredients, instructions,
      });
      return recipeObj(recipe);
    }
    return {};
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
