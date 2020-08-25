const connection = require('./connection');

const findAllRecipes = async () => {
  try {
    const db = await connection();
    const searchQuery = await db.getTable('recipes').select(['user', 'name']).execute();
    const results = await searchQuery.fetchAll()[0];
    return results
      ? results.map(([user, name]) => ({
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

module.exports = { findAllRecipes };
