const connection = require('./connection');
const serializer = require('../utils/serializer');

async function getAllRecipes() {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().execute();

  return recipe.fetchAll().map(serializer.recipe);
}

async function getRecipeByUser(id) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().where('user_id = :id').bind('id', id).execute();

  return recipe.fetchAll().map(serializer.recipe);
}

async function createRecipe({ id, user }, { name, ingredients, instructions }) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, user, name, ingredients, instructions)
    .execute();

  return recipe.getAutoIncrementValue();
}

async function getRecipeById(id) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  let recipe = await recipes.select().where('id = :id').bind('id', id).execute();
  recipe = await recipe.fetchOne();
  if (!recipe) return undefined;
  return serializer.recipe(recipe);
}

async function searchRecipe(query) {
  const db = await connection();
  const recipes = await db.getTable('recipes');
  const recipe = await recipes.select().where('name like :query').bind('query', `%${query}%`).execute();
  return recipe.fetchAll().map(serializer.recipe);
}

async function updateRecipe(id, { name, ingredients, instructions }) {
  try {
    const db = await connection();
    const recipes = await db.getTable('recipes');
    const newe = await recipes.update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();
    console.log(id, name, ingredients, instructions);
    console.log('newe', newe.getAffectedItemsCount());
    return { message: 'ok' };
  } catch (err) {
    console.log(err);
    return console.error(err);
  }
}

async function deleteRecipe(id) {
  try {
    const db = await connection();
    const recipes = await db.getTable('recipes');
    await recipes.delete()
      .where('id=:id').bind('id', id)
      .execute();
    return { message: 'ok' };
  } catch (err) {
    return console.error(err);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByUser,
};
