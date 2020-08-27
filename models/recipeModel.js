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

  return all.map(([userId, name, ingredients, instructions]) => ({
    name,
    ingredients: ingredients.split(','),
    instructions,
    userId,
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

async function getUserRecipesById(recipeId) {
  const recipesTable = await recipes();
  const userRecipes = await recipesTable
    .select()
    .where('user_id = :id')
    .bind('id', recipeId)
    .execute();

  const all = userRecipes.fetchAll();
  return all.map(([id, userId, username, recipeName, ingredients, instructions]) => ({
    id,
    userId,
    username,
    recipeName,
    ingredients,
    instructions,
  }));
}

async function createNewRecipe(userId, user, name, ingredients, instructions) {
  const recipesTable = await recipes();
  return recipesTable
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(userId, user, name, ingredients, instructions)
    .execute();
}

async function updateRecipe(id, name = '', ingredients = '', instructions = '') {
  const recipesTable = await recipes();
  return recipesTable
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
}

async function deleteRecipe() {
  const recipesTable = await recipes();
  recipesTable.delete();
}

module.exports = {
  getAllWithUsers,
  recipesById,
  recipesByName,
  getUserRecipesById,
  createNewRecipe,
  updateRecipe,
  deleteRecipe,
};
