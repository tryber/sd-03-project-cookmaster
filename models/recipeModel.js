const connection = require('./connection');
const serializer = require('../utils/serializer');

async function getAllRecipes() {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().execute();

  return recipe.fetchAll().map(serializer.recipe);
}

module.exports = { getAllRecipes };
