const { connectionDB } = require('./connection');

async function recipes() {
  const db = await connectionDB('cookmaster');
  return db.getTable('recipes');
}

async function getAllWithUsers() {
  const recipesTable = await recipes();

  const recipesAndUsers = await recipesTable
    .select(['id', 'user', 'name'])
    .execute();
  const all = await recipesAndUsers.fetchAll();

  return all.map(([id, username, recipeName]) => ({ id, username, recipeName }));
}

async function recipesById(id) {
  const recipesTable = await recipes();

  const recipe = await recipesTable
    .select(['user_id', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const all = await recipe.fetchAll();

  return all.map(([userRecipeId, name, ingredients, instructions]) => ({
    name,
    ingredients: ingredients.split(','),
    instructions,
    userRecipeId,
  }));
}

async function recipesByName(name) {
  const recipesTable = await recipes();
  const recipesFiltered = await recipesTable
    .select(['user_id', 'user', 'name'])
    .where('name LIKE :name')
    .bind('name', `%${name}%`)
    .execute();
  const all = await recipesFiltered.fetchAll();

  return all.map(([id, username, recipeName]) => ({ id, username, recipeName }));
}

module.exports = {
  getAllWithUsers,
  recipesById,
  recipesByName,
};
