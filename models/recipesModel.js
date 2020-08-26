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

module.exports = { findAllRecipes };
