const connect = require('./connect');

const addNewRecipe = async(userId, userName, recipeName, ingred, instruc) => {
  const db = await connect();
  await db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(userId, userName, recipeName, ingred, instruc)
    .execute()

  return true;
}

module.exports = {
  addNewRecipe,
};
