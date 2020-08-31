const connection = require('./connection');

const findAllRecipes = async () => {
  try {
    const db = await connection();
    const query = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const results = await query.fetchAll();
    return results
      ? results.map(([id, user, name]) => ({
        id,
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipeById = async (inputId) => {
  try {
    const db = await connection();
    const query = await db
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', inputId)
      .execute();

    const results = await query.fetchAll();
    return results
      ? results.reduce((acumulator, [id, userId, user, name, ingredients, instructions]) => ({
        ...acumulator,
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      }), null)
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipesByUserId = async (inputUserId) => {
  try {
    const db = await connection();
    const query = await db
      .getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('user_id = :user_id')
      .bind('user_id', inputUserId)
      .execute();

    const results = await query.fetchAll();
    return results
      ? results.map(([id, user, name]) => ({
        id,
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

const findRecipesByName = async (q) => {
  try {
    const db = await connection();
    const query = await db.getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name LIKE :q')
      .bind('q', `%${q}%`)
      .execute();
    const results = await query.fetchAll();
    return results
      ? results.map(([id, user, name]) => ({
        id,
        user,
        name,
      }))
      : null;
  } catch (error) {
    return error;
  }
};

async function newRecipe(userId, user, name, ingredients, instructions) {
  try {
    const db = await connection();
    const query = await db.getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute();
    return query;
  } catch (error) {
    return error;
  }
}

async function updateRecipe(id, name = '', ingredients = '', instructions = '') {
  try {
    const db = await connection();
    const query = await db.getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();

    return query;
  } catch (error) {
    return error;
  }
}

async function deleteRecipe(id) {
  try {
    const db = await connection();
    const query = await db.getTable('recipes')
      .delete()
      .where('id = :id')
      .limit(1)
      .bind('id', id)
      .execute();

    return query;
  } catch (error) {
    return error;
  }
}

module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipesByName,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipesByUserId,
};
