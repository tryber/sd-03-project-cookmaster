const connection = require('./connection');
const serializer = require('../utils/serializer');

async function getAllRecipes() {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().execute();

  return recipe.fetchAll().map(serializer.recipe);
}

async function getRecipeById(id) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().where('id = :id').bind('id', id).execute();

  return serializer.recipe(recipe.fetchOne());
}

module.exports = { getAllRecipes, getRecipeById };
