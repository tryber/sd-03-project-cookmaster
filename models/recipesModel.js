const connection = require('./connection');

const findAllRecipes = async () => {
  try {
    const db = await connection();
    const searchQuery = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.map(([id, user, name]) => ({
        id,
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipeByID = async (recipeId) => {
  try {
    const db = await connection();
    const searchQuery = await db
      .getTable('recipes')
      .select(['user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', recipeId)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.reduce(
        (acc, [user, name, ingredients, instructions]) => ({
          ...acc,
          user,
          name,
          ingredients,
          instructions,
        }),
        {},
      )
      : null;
  } catch (error) {
    return error;
  }
};

const searchRecipes = async (query) => {
  try {
    const db = await connection();
    const searchQuery = await db
      .getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name LIKE :name')
      .bind('name', `%${query}%`)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.map(
        ([id, user, name]) => ({
          id,
          user,
          name,
        }),
      )
      : null;
  } catch (error) {
    return error;
  }
};

module.exports = { findAllRecipes, findRecipeByID, searchRecipes };
