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
    ? responseRecipe.map(([id, user_id, user, name, ingredients, instructions]) => ({
      id,
      user_id,
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
};
