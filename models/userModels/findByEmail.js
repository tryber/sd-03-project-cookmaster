const { connect } = require('../connect');

const findByEmail = async (email) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([userId, userEmail, password, name, lastName]) => {
      return {
        id: userId,
        email: userEmail,
        password,
        name,
        lastName,
      };
    });

module.exports = findByEmail;
