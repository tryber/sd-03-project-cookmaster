const connection = require('./connection');

const finfByRecipes = async () => {
  try {
    const db = await connection();
    const sharchRecipes = await db.getTable('recipes').select(['id', 'user', 'name']).execute();

    const response = await sharchRecipes.fetchAll();
    return response
      ? response.map(([id, user, name]) => ({
        id,
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipesById = async (idRecipe) => {
  const db = await connection();
  const recipe = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', idRecipe)
    .execute();

  const responseRecipe = await recipe.fetchAll();
  return responseRecipe
    ? responseRecipe.map(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }))
    : null;
};

// query retirada de:
// https://stackoverflow.com/questions/40824845/using-a-like-sql-statement-in-express-node/40824981

const findSharchRecipe = async (query) => {
  const db = await connection();

  const responseSharchRecipe = await db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${query}%`)
    .execute();
  const responseRecipeQuery = responseSharchRecipe.fetchAll();

  return responseRecipeQuery ? responseRecipeQuery.map(([id, user, name]) => ({
    id, user, name,
  })) : null;
};

const createNewRecipes = async (userId, user, name, ingredients, instructions) => {
  const db = await connection();

  const createRecipe = await db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(userId, user, name, ingredients, instructions)
    .execute();

  return createRecipe;
};

const editRecipe = async (recipeId, name, ingredients, instructions) => {
  const db = await connection();

  const updateRecipe = await db.getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
  return updateRecipe;
};

const deleteRecipe = async (idRecipe) => {
  const db = await connection();

  const deleteRecipes = await db.getTable('recipes')
    .delete()
    .where('id = :idRecipe')
    .bind('id', idRecipe)
    .execute();
  return deleteRecipes;
};

const getPasswordToDelete = async (id) => {
  const db = await connection();
  const results = await db.getTable('users')
    .select('password')
    .where('id = :id')
    .bind('id', id)
    .execute();
  const passwordBank = results.fetchOne();
  return passwordBank;
};

const findAllRecipesById = async (idRecipe) => {
  const db = await connection();
  const recipe = await db
    .getTable('recipes')
    .select()
    .where('id = :id')
    .bind('id', idRecipe)
    .execute();

  const responseRecipe = await recipe.fetchAll();
  return responseRecipe
    ? responseRecipe.map(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }))
    : null;
};

module.exports = {
  finfByRecipes,
  findRecipesById,
  findSharchRecipe,
  createNewRecipes,
  editRecipe,
  deleteRecipe,
  getPasswordToDelete,
  findAllRecipesById,
};
