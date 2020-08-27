const connect = require('./connect');

const getAllRecipes = async () => {
  try {
    const db = await connect();
    const searchDb = await db.getTable('recipes').select(['user', 'name']).execute();
    const results = await searchDb.fetchAll();
    return results ? results.map(([user, name]) => ({ user, name })) : [];
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = { getAllRecipes };
