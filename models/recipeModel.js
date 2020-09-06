const connect = require('./connection');

const fetchAllRecipes = async () => {
  const db = await connect();

  const fetch = await db.getTable('recipes').select(['id', 'user', 'name']).execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const findById = async (id) => connect()
  .then((db) => db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute()
  )
  .then((fetch) => fetch.fetchOne())
  .then(([id, uId, user, name, ingredients, instructions]) => ({ 
    id, uId, user, name, ingredients, instructions, 
  }));

const findByQuery = async (query) => {
  const db = await connect();

  const fetch = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name LIKE :name')
    .bind('name', `%${query}%`) 
    .execute();

  const recipes = fetch.fetchAll();

  return recipes.map(([id, uId, user, name, ingredients, instructions]) => ({ 
    id, uId, user, name, ingredients, instructions, 
  }));
};

const registerRecipe = async (uId, user, name, ingredients, instructions) => {
  const db = await connect();

  await db
    .getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(uId, user, name, ingredients, instructions)
    .execute()
};

const upadateRecipe = async (id, name, ingredients, instructions) => {
  const db = await connect();

  await db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute()

}

const deleteRecipe = async (id) => {
  const db = await connect();

  await db
    .getTable('recipes')
    .delete()
    .where('id = :id')
    .bind('id', id)
    .execute()
}

const listByUserId = async (id) => {
  const db = await connect();
  const list = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :id')
    .bind('id', id)
    .execute()
  
  const recipes = list.fetchAll();
  return recipes.map(([id, uId, user, name, ingredients, instructions]) => ({ 
    id, uId, user, name, ingredients, instructions 
  }))};

module.exports = {
  fetchAllRecipes,
  findById,
  findByQuery,
  registerRecipe,
  upadateRecipe,
  deleteRecipe,
  listByUserId,
}