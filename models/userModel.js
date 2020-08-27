const connect = require('./connection');

const findByEmail = async (email) => {
  try {
    const user = await connect()
      .then((db) => db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', email)
      .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, email, password, first_name, last_name]) => ({
      id, email, password, first_name, last_name,
    }));
    return user;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const findById = async (id) => {
  return id;
};

module.exports = {
  findByEmail,
  findById,
};
