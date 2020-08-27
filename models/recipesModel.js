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

module.exports = {
  finfByRecipes,
};
