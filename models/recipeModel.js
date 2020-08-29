const connect = require('./connect');

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

const findRecipeByName = async (input) => {
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

module.exports = {
  getAllRecipes,
  getRecipeById,
  findRecipeByName,
};
