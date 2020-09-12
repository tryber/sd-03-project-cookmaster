const connect = require('./connection');

const getRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, nameRecipe]) => ({
    id,
    user,
    nameRecipe,
  })));

const getRecipesById = async (recipeId) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  }))[0]);

const filterRecipe = async (filterParam) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name LIKE :filterParam')
    .bind('filterParam', `%${filterParam}%`)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  }))[0]);

const addRecipe = async (
  userId,
  user,
  name,
  ingredients,
  instructions,
) => {
  const db = await connect();

  await db.getTable('recipes')
    .insert((['user_id', 'user', 'name', 'ingredients', 'instructions']))
    .values(userId, user, name, ingredients, instructions)
    .execute();
};

const editRecipe = async (id, name, ingredients, instructions) => {
  const db = await connect();

  await db.getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

module.exports = {
  getRecipes,
  getRecipesById,
  filterRecipe,
  addRecipe,
  editRecipe,
};
