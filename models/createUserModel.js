const connection = require('./connection');

const userCreate = async (email, senha, nome, sobrenome) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, senha, nome, sobrenome)
      .execute(),
  );

module.exports = {
  userCreate,
};
