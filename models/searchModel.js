const connect = require('./connect');

const findByName = async (name) => {
  try {
    const db = await connect();
    const searchDb = await db
      .getTable('recipes')
      .select(['user', 'name'])
      .where('name LIKE :name')
      .bind('name', `%${name}%`)
      .execute();
    const results = await searchDb.fetchAll();
    return results
      ? results.map(([user, name]) => ({
          user,
          name,
        }))
      : [];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
module.exports = { findByName };
