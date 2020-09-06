const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    })));


const recipeById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([recipeId, userId, user, name, ingredients, instructions] = []) => (recipeId ? {
      id: recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    } : null));

const recipeByName = async (recipe) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .where('name like :recipe')
        .bind('recipe', `%${recipe}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name, ingredients, instructions]) => ({
      id,
      user,
      name,
      ingredients,
      instructions,
    })));

const addRecipe = async (userId, userName, recipeName, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, userName, recipeName, ingredients, instructions)
      .execute(),
  );

const updateRecipe = async (id, recipeName, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

module.exports = {
  getAllRecipes,
  recipeById,
  recipeByName,
  addRecipe,
  updateRecipe,
};
