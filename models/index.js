//user
const findByEmail = require('./userModels/findByEmail');
const findById = require('./userModels/findById');
//recipe
const getAll = require('./recipeModels/getAll');

module.exports = {
  findByEmail,
  findById,
  getAll,
}
