const db = require('./DbConnection');


const listRecipes = async () => (
  db()
  .then((data) => data.getTable('recipes').select(['id', 'name', 'user']).execute()
    .then((results) => results.fetchAll())
    .then((listData) => listData.map(([id, name, user]) => ({ id, name, user }))),
  )
);

const findRecipById = async (id) => {
  const receitas = await db()
  .then((data) => data.getTable('recipes')
  .select()
  .where('id = :id')
  .bind('id', id)
  .execute());
  const recipes = receitas.fetchAll();
  return recipes.map(([id2, userid, username, recipename, ingredients, instructions]) => (
  { id2, userid, username, recipename, ingredients, instructions }
))[0];
};

const editRecipe = async (recipeId, name, ingredients, instructions) =>
  db().then((db2) =>
    db2
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
  );

const deleteRecipe = async (id) =>
    db().then((db2) =>
    db2
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

const findRecipesSearch = async (search) =>
    db()
    .then((db2) =>
      db2
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${search}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

    

module.exports = {
  listRecipes,
  findRecipById,
  editRecipe,
  deleteRecipe,
  findRecipesSearch,
};
