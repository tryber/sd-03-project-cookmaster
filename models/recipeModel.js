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

const getRecipesById = async () => {
  const db = await connection();
  const results = await db.getTable('recipes')
    .select(['id', 'user_id', 'name', 'ingredients', 'instructions'])
    .execute();

  const findRecipes = results.fetchAll();

  return findRecipes ? findRecipes.map(([id, userId, name, instructions, ingredients]) => ({
    id, instructions, ingredients, userId, name,
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


const editRecipesBank = async (id) => {
  const db = await connection();

  const results = await db.getTable('recipes')
    .select(['user_id', 'name', 'ingredients', 'instructions'])
    .where('user_id  = id')
    .bind('id', id)
    // .update(ingredients, instructions)
    .execute();
  const editSucess = results.fetchAll();

  return editSucess ? editSucess.map(([name, ingredients, instructions]) => ({
    name, ingredients, instructions,
  })) : null;
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

module.exports = {
  getRecipes,
  getRecipesByQuery,
  getRecipesById,
  postRecipes,
  editRecipesBank,
  deleteRecipeBank,
};
