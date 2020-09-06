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
    const result = await searchDb.fetchAll();
    const [[userId, user, name, ingredients, instructions]] = result;
    return result !== []
      ? {
        id,
        user_id: userId,
        user,
        name,
        ingredients,
        instructions,
      }
      : null;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function insertRecipe(name, user, ingredients, instructions, userId) {
  try {
    const db = await connect();
    const result = await  db
      .getTable('recipes')
      .insert(['user_id', 'user','name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute();
      return result.getAutoIncrementValue();
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
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function deleteRecipe(id) {
  try {
    const db = await connect();
    return db.getTable('recipes')
    .delete()
    .where('id = :id')
    .bind('id', id)
    .execute();
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

async function getByUserId(userId) {
  try {
    const db = await connect();
    console.log(userId)
    const searchDb = await db
      .getTable('recipes')
      .select()
      .where('user_id = :user_id')
      .bind('user_id', userId)
      .execute();
    const results = await searchDb.fetchAll();
    console.log(results)
    return results !== [[]]
      ? results.map(
        ( [id, uid, user, name, ingredients, instructions] ) => (
          {
            id,
            user_id: uid,
            user,
            name,
            ingredients,
            instructions,
          })
      )
      : null;
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
  deleteRecipe,
  getByUserId,
};
