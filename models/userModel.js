const connection = require('./connection');

const findByEmail = async (email) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'email', 'password'])
      .where('email = :email')
      .bind('email', email)
      .execute())
    .then((results) => results.fetchAll())
    .then(([id, userEmail, password]) => ({ id, userEmail, password }))
);

// const findById = async (id) => {
//   return TEMP_USER;
// };

module.exports = {
  findByEmail,
  // findById,
};
