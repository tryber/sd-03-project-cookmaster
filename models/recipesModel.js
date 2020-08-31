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
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', recipeId)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.reduce(
        (acc, [id, userId, user, name, ingredients, instructions]) => ({
          ...acc, id, userId, user, name, ingredients, instructions,
        }),
        {},
      )
      : null;
  } catch (error) {
    return error;
  }
};

const searchRecipes = async (query) => {
  if (!query) return [];
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

const createRecipe = async (userID, user, name, ingredients, instructions) => {
  try {
    const db = await connection();
    const updateQuery = await db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userID, user, name, ingredients, instructions)
      .execute();
    return updateQuery;
  } catch (error) {
    return error;
  }
};

const updateRecipe = async (id, name, ingredients, instructions) => {
  try {
    const db = await connection();
    const updateQuery = await db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();
    return updateQuery;
  } catch (error) {
    return error;
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    const updateQuery = await db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute();
    return updateQuery;
  } catch (error) {
    return error;
  }
};

const findAllRecipesByUserID = async (UserID) => {
  try {
    const db = await connection();
    const searchQuery = await db
      .getTable('recipes')
      .select()
      .where('user_id = :user_id')
      .bind('user_id', UserID)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllRecipes,
  findRecipeByID,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  findAllRecipesByUserID,
};
