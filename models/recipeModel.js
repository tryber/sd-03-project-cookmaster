const connection = require('./connection');

const getRecipes = async () => {
  const db = await connection();

  const results = await db.getTable('recipes')
  .select(['id', 'user', 'name'])
  .execute();

  const resultsRecipes = results.fetchAll();
  console.log('deixa ver', resultsRecipes)

  return resultsRecipes ? resultsRecipes.map(([id, user, name]) => ({
    id,
    user,
    name,
  }))[0] : null;
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
