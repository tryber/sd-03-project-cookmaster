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

const findRecipesById = async () => {
  const db = await connection();
  const recipe = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
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

module.exports = {
  finfByRecipes,
  findRecipesById,
  findSharchRecipe,
  createNewRecipes,
};
