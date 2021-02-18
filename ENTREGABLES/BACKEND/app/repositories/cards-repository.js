"use strict";

const Joi = require("joi");
const database = require("../infrastructure/database");

async function readAll() {
  const pool = await database.getPool();
  const query = `select u.nombreusuario, u.apel1, u.apel2, t.numerotarjeta, t.fechaexpiracion from tarjeta t inner join usuario u;`;
  const [card] = await pool.query(query);

  return card;
}

async function findLastCardId() {
  const pool = await database.getPool();
  const query = `SELECT max(idtarjeta) as ultimoID FROM tarjeta`;
  let [id] = await pool.query(query);

  const generateNewId = id[0].ultimoID + 1;
  return generateNewId;
}

async function findCardById(id) {
  const pool = await database.getPool();
  const query = `SELECT * FROM tarjeta WHERE idtarjeta=?`;
  const [card] = await pool.query(query, id);

  return card;
}

async function findCardByUserId(userId) {
  const pool = await database.getPool();
  const query = `SELECT u.nombreusuario, u.apel1, u.apel2, t.numerotarjeta, t.fechaExpiracion FROM usuario u INNER JOIN tarjeta t ON u.idusuario = t.idusuario WHERE u.idusuario=?`;
  const [cardByUser] = await pool.query(query, userId);

  return cardByUser;
}

async function addCard(cards) {
  const pool = await database.getPool();
  const id = await findLastCardId();

  const { numerotarjeta, idusuario, fechaExpiracion, csv } = cards;

  const query = `INSERT INTO tarjeta ( idtarjeta, numerotarjeta, idusuario, fechaExpiracion, csv) VALUES (?,?,?,?,?)`;

  const [card] = await pool.query(query, [
    id,
    numerotarjeta,
    idusuario,
    fechaExpiracion,
    csv,
  ]);

  return card;
}

async function modifiyCardById(cardId, card) {
  const { numerotarjeta, fechaExpiracion, csv } = card;

  const pool = await database.getPool();
  const query = `UPDATE tarjeta SET numerotarjeta=?, fechaExpiracion=?, csv=? WHERE idtarjeta=?`;

  await pool.query(query, [numerotarjeta, fechaExpiracion, csv, cardId]);

  return true;
}

async function deleteCardById(cardId) {
  const pool = await database.getPool();
  const query = `DELETE FROM tarjeta WHERE idtarjeta=?`;
  const [card] = await pool.query(query, cardId);

  return card;
}

module.exports = {
  readAll,
  addCard,
  deleteCardById,
  findCardById,
  findCardByUserId,
  modifiyCardById,
};
