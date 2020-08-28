const connection = require('./connection');
const { response } = require('express');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (EMAIL) => {
  const db = await connection();
  const sharchUser = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', EMAIL)
    .execute();

  const response = sharchUser.fetchAll();
  return response
    ? response.reduce(
      (acc, [id, email, password, name, lastName]) => ({
        ...acc,
        id,
        email,
        password,
        name,
        lastName,
      }),
      {},
    )
    : null;
};

const findById = async (ID) => {
  const db = await connection();
  const sharchUser = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', ID)
    .execute();

  const response = sharchUser.fetchAll();

  return response
    ? response.reduce(
      (acc, [id, email, password, name, lastName]) => ({
        ...acc,
        id,
        email,
        password,
        name,
        lastName,
      }),
      {},
    )
    : null;
};

const createUser = async (email, password, name, lastName) => {
  const db = await connection();
  const queryInsert = await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, name, lastName)
    .execute();
  return queryInsert;
};

module.exports = {
  findByEmail,
  findById,
  createUser,
};
