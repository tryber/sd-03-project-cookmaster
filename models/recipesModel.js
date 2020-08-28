const connection = require('./connection');

const findAllRecipes = async () => {
  try {
    const db = await connection();
    const query = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const results = await query.fetchAll();
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

const findRecipeById = async (inputId) => {
  try {
    const db = await connection();
    const query = await db
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', inputId)
      .execute();

    const results = await query.fetchAll();
    return results
      ? results.reduce((acumulator, [id, userId, user, name, ingredients, instructions]) => ({
        ...acumulator,
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      }), null)
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipesByName = async (q) => {
  try {
    const db = await connection();
    const query = await db.getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name LIKE :q')
      .bind('q', `%${q}%`)
      .execute();
    const results = await query.fetchAll();
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

module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipesByName,
};
