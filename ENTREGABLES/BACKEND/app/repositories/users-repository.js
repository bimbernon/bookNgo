"use strict";

const database = require("../infrastructure/database");

async function findAllUsers() {
  const pool = await database.getPool();
  const query = "select * from usuario";
  const [users] = await pool.query(query);

  return users;
}

async function findUserById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE idusuario = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}

async function findUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE email = ?";
  const [users] = await pool.query(query, email);

  return users[0];
}

async function findLastUserId() {
  const pool = await database.getPool();
  const query = "SELECT max(idusuario) as lastUserId from usuario";
  let [id] = await pool.query(query);

  const generatedId = id[0].lastUserId + 1;
  return generatedId;
}

async function createUser(user) {
  const pool = await database.getPool();
  const userId = await findLastUserId();

  const {
    name,
    admin,
    userProfileName,
    passwordHash,
    lastName1,
    lastName2,
    email,
    photoCod,
  } = user;

  const insertQuery =
    "INSERT INTO usuario ( idusuario, admin, nombreusuario, nombreperfilusuario, contraseña, apel1, apel2, email, codFoto ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [createdUser] = await pool.query(insertQuery, [
    userId,
    admin,
    name,
    userProfileName,
    passwordHash,
    lastName1,
    lastName2,
    email,
    photoCod,
  ]);

  console.log([createdUser]);

  return createdUser;
}

module.exports = {
  createUser,
  findAllUsers,
  findLastUserId,
  findUserById,
  findUserByEmail,
};
