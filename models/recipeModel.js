const connection = require('./connection');
const serializer = require('../utils/serializer');

async function getAllRecipes() {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().execute();

  return recipe.fetchAll().map(serializer.recipe);
}

async function createRecipe({ id, user }, { name, ingredients, instructions }) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  await recipes.insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, user, name, ingredients, instructions)
    .execute();

  return { messa: 'ok' };
}

async function getRecipeById(id) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().where('id = :id').bind('id', id).execute();

  return serializer.recipe(recipe.fetchOne());
}

async function searchRecipe(query) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().where('name like :query').bind('query', `%${query}%`).execute();
  return recipe.fetchAll().map(serializer.recipe);
}

module.exports = {
  getAllRecipes, getRecipeById, searchRecipe, createRecipe,
};
