const connect = require('./connect');

async function getAllRecipes() {
  try {
    const db = await connect();
    const searchDb = await db.getTable('recipes').select(['user', 'name', 'id']).execute();
    const results = await searchDb.fetchAll();
    return results ? results.map(([user, name, id]) => ({ user, name, id })) : [];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function getRecipeById(id) {
  try {
    const db = await connect();
    const searchDb = await db
      .getTable('recipes')
      .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute();
    const results = await searchDb.fetchAll();
    return results
      ? results.map(([user, name, ingredients, instructions]) => ({
          user,
          name,
          ingredients,
          instructions,
        }))
      : [];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function insertRecipe(name, ingredients, instructions, user_id) {
  try {
    const db = await connect();
    return db
      .getTable('recipes')
      .insert(['user_id', 'name', 'ingredients', 'instructions'])
      .values(user_id, name, ingredients, instructions)
      .execute();
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function updateRecipe(id, name, ingredients, instructions) {
  try {
    const db = await connect();
    return db
      .getTable('recipes')
      .update(['name', 'ingredients', 'instructions'])
      .set([name, ingredients, instructions])
      .where('user_id = :id')
      .bind('id', id)
      .values(name, ingredients, instructions)
      .execute();
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  insertRecipe,
  updateRecipe,
};
