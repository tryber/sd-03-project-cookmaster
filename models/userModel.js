const connect = require('./connection');

const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};

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
      id, email, password, first_name, last_name
    }));
    return user;
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
};

const findById = async (id) => {
  return TEMP_USER;
};

module.exports = {
  findByEmail,
  findById,
};
