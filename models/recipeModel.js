const { connectionDB } = require('./connection');

async function recipes() {
  const db = await connectionDB('cookmaster');
  return db.getTable('recipes');
}

async function getAllWithUsers() {
  const recipesTable = await recipes();

  const recipesAndUsers = await recipesTable
    .select(['user', 'name'])
    .execute();
  const all = await recipesAndUsers.fetchAll();

  return all.map(([username, recipeName]) => ({ username, recipeName }));
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
    userRecipeId
  }));
}


module.exports = {
  getAllWithUsers,
  recipesById,
};
