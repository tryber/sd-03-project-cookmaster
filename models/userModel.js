const { connection } = require('../database');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const query = `SELECT * from Users WHERE email = '${email}'`;

  return new Promise((fulfill, reject) => {
    connection.query(query, (err, rows) => {
      if (err) reject(err);
      return fulfill(rows && rows[0]);
    });
  });
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = (id) => {
  const query = `SELECT * from Users WHERE id = ${id}`;

  return new Promise((fulfill, reject) => {
    connection.query(query, (err, rows) => {
      if (err) reject(err);
      return fulfill(rows && rows[0]);
    });
  });
};

const createUser = (email, password, name, lastName) => {
  const query = `INSERT INTO Users (email, pass, first_name, last_name)
  VALUES ('${email}', '${password}', '${name}', '${lastName}');`;
  return new Promise((fulfill, reject) => {
    connection.query(query, (err, rows) => {
      if (err) reject(err);
      return fulfill(rows && rows[0]);
    });
  });
};
// const listUsers = () => {
//   return new Promise((fulfill, reject) => {
//     connection.query('SELECT * from Users', (er r, rows) => {
//       if (err) {
//         reject(err);
//       }

//       return fulfill(rows);
//     });
//   });
// };

module.exports = {
  findByEmail,
  findById,
  createUser,
};
