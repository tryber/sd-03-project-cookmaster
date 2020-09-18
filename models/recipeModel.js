const connect = require('./connection');

const getAllRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((res) => res.fetchAll())
  .then((res) => res.map(([id, user, name]) => ({
    id,
    user,
    name,
  })));

const getRecipeById = async (id) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((res) => res.fetchAll()[0])
  .then(([recipeId, userId, userName, recipeName, ingredients, instructions]) => ({
    recipeId,
    userId,
    userName,
    recipeName,
    ingredients,
    instructions,
  }));

const getRecipesByUserId = async (userId) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['user_id', 'user', 'name'])
    .where('user_id = :user_id')
    .bind('user_id', userId)
    .execute())
  .then((results) => results.fetchAll())
  .then((res) => res.map(([id, user, name]) => ({
    id,
    user,
    name,
  })));

const findRecipes = async (q) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${q}%`)
    .execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes
    .map(([id, user, name]) => ({
      id,
      user,
      name,
    })));

const createRecipe = async (userId, userName, name, ingredients, instructions) => connect()
  .then((db) => db
    .getTable('recipes')
    .insert('user_id', 'user', 'name', 'ingredients', 'instructions')
    .values(userId, userName, name, ingredients, instructions)
    .execute());

const editRecipe = async (id, name, ingredients, instructions) => connect()
  .then((db) => db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute());

const deleteRecipe = async (id) => connect()
  .then((db) => db
    .getTable('recipes')
    .delete()
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  findRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
};
