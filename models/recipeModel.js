const connection = require('./connection');

const getRecipes = async () => {
  const db = await connection();

  const results = await db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute();

  const resultsRecipes = results.fetchAll();

  return resultsRecipes ? resultsRecipes.map(([id, user, name]) => ({
    id,
    user,
    name,
  })) : null;
};

const getRecipesById = async (userId) => {
  const db = await connection();
  const results = await db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', userId)
    .execute();

  const findRecipes = results.fetchAll();

  return findRecipes ? findRecipes.map(([id, userId, user, name,  ingredients, instructions]) => ({
    id, instructions, ingredients, userId, name, user
  })) : null;
};

const getRecipesByQuery = async (query) => {
  const db = await connection();

  const results = await db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    // query retirada de:
    // https://stackoverflow.com/questions/40824845/using-a-like-sql-statement-in-express-node/40824981
    .bind('name', `%${query}%`)
    .execute();
  const findByQuery = results.fetchAll();

  return findByQuery ? findByQuery.map(([id, user, name]) => ({
    id, user, name,
  })) : null;
};

const postRecipes = async (valuesRecipes, valuesUser) => {
  const db = await connection();
  const { nameRecipe, ingredients, instructions } = valuesRecipes;
  const { id, name, lastName } = valuesUser;
  const userId = id;
  const fullName = `${name} ${lastName}`;

  await db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(userId, fullName, nameRecipe, instructions, ingredients)
    .execute();
};

const editRecipesBank = async (id, datas) => {
  const db = await connection();
  const { name, ingredients, instructions } = {name: 'william', ingredients: 'sabor', instructions:'ze'};
  const results = await db.getTable('recipes')

    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();

  // const editSucess = results.fetchAll();
  // return editSucess ? editSucess.map(([name, ingredients, instructions]) => ({
  //   name, ingredients, instructions,
  // })) : null;
  return results;
};

const deleteRecipeBank = async (idRecipe) => {
  const db = await connection();

  const results = await db.getTable('recipes')
    .delete()
    .where('id = :idRecipe')
    .bind('idRecipe', idRecipe)
    .execute();
  return results;
};

const getPasswordToDelete = async (id) => {
  const db = await connection();

  const results = await db.getTable('users')
    .select('password')
    .where('id = :id')
    .bind('id', id)
    .execute();

  const passwordBank = results.fetchOne();
  return passwordBank;
};

module.exports = {
  getRecipes,
  getRecipesByQuery,
  getRecipesById,
  postRecipes,
  editRecipesBank,
  deleteRecipeBank,
  getPasswordToDelete,
};
