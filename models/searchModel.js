const connect = require('./connect');

const getSearch = async (text) => {
  const db = await connect();
  const result = await db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name LIKE :text')
    .bind('text', `%${text}%`)
    .execute();

  const recipeInfo = result.fetchAll();

  return recipeInfo.map(([id, user, name]) => ({ id, user, name }));
};

module.exports = {
  getSearch,
};
