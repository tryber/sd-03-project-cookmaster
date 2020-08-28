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


const getRecipesById = async () => {
  const db = await connection();
  const results = await db.getTable('recipes')
    .select(['id', 'user_id', 'name', 'ingredients', 'instructions'])
    .execute();

  const findRecipes = results.fetchAll();

  return findRecipes ? findRecipes.map(([id, userId, name, instructions, ingredients]) => ({
    id, instructions, ingredients, userId, name,
  })) : null;
};

module.exports = {
  getRecipes,
  getRecipesById,
};
