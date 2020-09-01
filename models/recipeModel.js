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
      .select(['user', 'name', 'ingredients', 'instructions'])
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

module.exports = { getAllRecipes, getRecipeById };
