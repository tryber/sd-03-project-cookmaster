const connection = require('./connection');

const recipeByName = async (recipe) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .where('name like :recipe')
        .bind('recipe', `%${recipe}%`) // a receita deve conter o nome a palavra do parametro
        .execute(),
    )
    .then((results) => results.fetchAll()) // transforma em um array
    .then((recipes) =>
      recipes.map(([id, user, name, ingredients, instructions]) => ({
        // faz um map no array para retornar as receitas que tenham a palavra no nome
        id,
        user,
        name,
        ingredients,
        instructions,
      })),
    )
    .catch(console.log('Model: Erro no recipeByName'));

module.exports = {
  recipeByName,
};
