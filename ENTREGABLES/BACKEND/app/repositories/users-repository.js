"use strict";

// const { async } = require("crypto-random-string");
const database = require("../infrastructure/database");

async function findAllUsers() {
  const pool = await database.getPool();
  const query = "select * from usuario";
  const [users] = await pool.query(query);

  return users;
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

async function findUserById(userId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE idusuario = ?";
  const [users] = await pool.query(query, userId);

  return users[0];
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

  return createdUser;
}

async function eraseUser(userId) {
  const pool = await database.getPool();
  const query = "DELETE FROM usuario WHERE idusuario = ?";
  await pool.query(query, userId);

  return true;
}

async function updateUser(data) {
  const { name, userProfileName, passwordHash, lastName1, lastName2 } = data;
  const pool = await database.getPool();
  const updateQuery = `UPDATE usuario 
  SET nombreusuario = ?, nombreperfilusuario = ?, contraseña = ?, apel1 = ?, apel2 = ? 
  WHERE idusuario = ?`;
  await pool.query(updateQuery, [
    name,
    userProfileName,
    passwordHash,
    lastName1,
    lastName2,
  ]);

  return true;
}

async function findUserProfileImage(userId) {
  const pool = await database.getPool();
  const query = "SELECT codFoto FROM users WHERE idusuario = ?";
  const [users] = await pool.query(query, userId);

  return users[0];
}

async function uploadImageProfile(userId, image) {
  const pool = await database.getPool();
  const updateQuery = "UPDATE users SET codFoto = ? WHERE idusuario = ?";
  await pool.query(updateQuery, [image, userId]);

  return true;
}

module.exports = {
  createUser,
  eraseUser,
  findAllUsers,
  findLastUserId,
  findUserById,
  findUserByEmail,
  updateUser,
  findUserProfileImage,
  uploadImageProfile,
};
