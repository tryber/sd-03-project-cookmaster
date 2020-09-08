const connect = require('../models/connection');

const getAllRecipes = async () =>
  connect().then((db) => db
    .getTable('recipes')
    .select()
    .execute(),
    ).then((results) => results.fetchAll());

const getRecipeById = async (uId) => {
  try {
    const recipe = await connect()
      .then((db) => db
        .getTable('recipes')
        .select()
        .where('id = :id')
        .bind('id', uId)
        .execute(),
      )
      .then((results) => results.fetchAll()[0]);
    if (recipe) {
      const recipeObj = ([id, userId, user, name, ingredients, instructions]) => ({
        id, userId, user, name, ingredients, instructions,
      });
      return recipeObj(recipe);
    }
    return {};
  } catch (err) {
    return err;
  }
};

// funçao q o luis campos jogou no slack e que adaptei com try catch
const getRecipeByQuery = async (query) => {
  try {
    const recipes = await connect()
      .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name LIKE :query')
        .bind('query', `%${query}%`)
        .execute(),
      )
      .then((results) => results.fetchAll());

    if (recipes.length) {
      return recipes.map(([id, user, name]) => ({ id, user, name }));
    }
    return [];
  } catch (err) {
    return err;
  }
};

const getRecipeByUserId = async (uId) => {
  try {
    const recipes = await connect()
      .then((db) =>
      db
        .getTable('recipes')
        .select()
        .where('user_id = :id')
        .bind('id', uId)
        .execute(),
      )
      .then((results) => results.fetchAll());

    if (recipes.length) {
      return recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id, userId, user, name, ingredients, instructions,
      }));
    }
    return [];
  } catch (err) {
    return err;
  }
};

const deleteRecipe = async (rId) => connect()
  .then((db) => db
    .getTable('recipes')
    .delete()
    .where('id = :id')
    .bind('id', rId)
    .execute(),
  );

module.exports = {
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByQuery,
  getRecipeByUserId,
};
