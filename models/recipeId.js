// const connection = require('./connection');

// const recipeById = async (
//   id, // pesquisa por ID
// ) =>
//   connection()
//     .then((
//       db, // tenta fazer a conexão com o banco de dados e pegar as coisas desejadas
//     ) =>
//       db
//         .getTable('recipes') // tabela de receitas
//         .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions']) // seleciona as colunas citadas
//         .where('id = :id') // que sejam igual ao ID que foi passado de parametro
//         .bind('id', id) // faz um bind no id
//         .execute(),
//     )
//     .then(function (results) {
//       return results.fetchAll()[0];
//     }) // transforma em um array e pega o primeiro indice
//     .then(([recipeId, userId, user, name, ingredients, instructions] = []) =>
//       recipeId
//         ? {
//           id: recipeId,
//           userId,
//           user,
//           name,
//           ingredients,
//           instructions,
//         }
//         : null,
//     );

// module.exports = {
//   recipeById,
// };
