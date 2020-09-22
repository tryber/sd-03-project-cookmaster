const { connect } = require('../connect');

const editUser = async (id, email, password, name, lastName) =>
  connect().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

module.exports = editUser;
