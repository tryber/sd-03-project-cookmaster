const connection = require('./connection');

const getRecipes = async () => {
  const db = await connection();

  const results = await db.getTable('recipes')
  .select(['id', 'user', 'name'])
  .execute();

  const resultsRecipes = results.fetchAll();

  return resultsRecipes ? resultsRecipes.map(([id, user, name]) => ({
    id,
    user,
    name,
  })) : null;
};

// const findRecipesById = async () => {
//   const db = await connection();
//   const results = await db.getTable('recipes')
//     .select(['id', 'user_id', 'name', 'ingredients', 'instructions'])
//     .execute();
//   return b = results.fetchAll() ? b.map(([id]) => ({ id })) : null;
// };

module.exports = {
  getRecipes,
};
