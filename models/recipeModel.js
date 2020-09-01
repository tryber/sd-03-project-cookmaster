const connect = require('./connect');
const { findById } = require('./userModel');

const getAllRecipes = async () => {
  const db = await connect();

  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();

  const recipes = results.fetchAll();

  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (id) => {
  const db = await connect();

  const results = await db
    .getTable('recipes')
    .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [userId, user, name, ingredients, instructions] = await results.fetchOne();

  return name ? { id, userId, user, name, ingredients, instructions } : null;
};

const getRecipeByName = async (input) => {
  const db = await connect();

  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :input')
    .bind('input', `%${input}%`)
    .execute();

  const recipes = await results.fetchAll();

  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const addRecipe = async (user, userId, name, ingredients, instructions) => {
  const db = await connect();
  return db
    .getTable('recipes')
    .insert(['user', 'user_id', 'name', 'ingredients', 'instructions'])
    .values(user, userId, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async (id, name, ingredients, instructions) => {
  const db = await connect();
  return db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

const deleteRecipeById = async (recipeId) => {
  const db = await connect();
  return db
    .getTable('recipes')
    .delete()
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute();
};

const authUser = async (recipeId, userId, password) => {
  const recipe = await getRecipeById(recipeId);
  const recipeOwner = await findById(recipe.userId);
  if (userId !== recipeOwner.id || password !== recipeOwner.password) {
    return false;
  }
  return true;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  addRecipe,
  updateRecipe,
  deleteRecipeById,
  authUser,
};
