const connect = require('./connect');

const getAllRecipes = async () => {
  const db = await connect();

  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute();

  const recipes = results.fetchAll();

  return recipes.map(([id, user, name]) => ({id, user, name}))
};

module.exports = {
  getAllRecipes,
};
