"use strict";

const { isError } = require("joi");
const Joi = require("joi");
const database = require("../infrastructure/database");

async function readAll() {
  const pool = await database.getPool();
  const query = `select u.idusuario, u.nombreusuario, l.titulo, r.fechareserva, r.fechadevolucion, r.rating from reserva r inner join libro l on r.idlibro = l.idlibro inner join usuario u on r.idusuario = u.idusuario`;
  const [reserve] = await pool.query(query);

  return reserve;
}

async function findReserveByUserId(userId) {
  const pool = await database.getPool();
  const query = `select l.titulo, r.fechareserva, r.fechadevolucion, l.precio from libro l inner join reserva r on l.idlibro = r.idlibro where r.idusuario=?`;
  const [reserveByUser] = await pool.query(query, userId);

  return reserveByUser;
}

async function addReserve(reserve) {
  const pool = await database.getPool();

  try {
    pool.query("START TRANSACTION");

    const {
      idusuario,
      idlibro,
      fechareserva,
      fechadevolucion,
      valoracion,
    } = reserve;

    const query = `INSERT INTO reserva ( idusuario, idlibro, fechareserva, fechadevolucion, rating) VALUES (?,?,?,?,?)`;

    const [addedReserve] = await pool.query(query, [
      idusuario,
      idlibro,
      fechareserva,
      fechadevolucion,
      valoracion,
    ]);

    console.log(await decreaseBookStock(pool, reserve.idlibro));
    await pool.query("COMMIT");

    return addedReserve;
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log("ROLLBACK de las operaciones", err);
    throw err;
  }
}

async function checkStock() {
  const pool = await database.getPool();
  const query = `select stock, if (stock > 0, "Hay stock", "No hay stock") as disponibilidad from libro where idlibro=?`;
  const [stock] = await pool.query(query);

  return stock[0].stock;
}

async function decreaseBookStock(pool, idlibro) {
  // const pool = await database.getPool();
  const query = `update libro set stock = stock - 1 where idlibro = ?`;
  const [bookStock] = await pool.query(query, idlibro);

  return true;
}

async function modifyReserve(updateReserve) {
  const { bookId, userId, reserveDate, rating } = updateReserve;

  const pool = await database.getPool();
  const query = `UPDATE reserva SET rating=? WHERE idusuario=? AND idlibro=? AND fechareserva=?`;
  await pool.query(query, [rating, userId, bookId, reserveDate]);

  return true;
}

async function eraseReserve(userId, bookId) {
  const idusuario = userId;
  const idlibro = bookId;
  const pool = await database.getPool();
  const query = `DELETE FROM reserva WHERE idusuario=${userId} AND idlibro=${bookId}`;
  const [deletedReserve] = await pool.query(query);

  return true;
}

async function checkReserveDate(idlibro) {
  const pool = await database.getPool();
  const query = `select idlibro, fechareserva, fechadevolucion, if(fechareserva < fechadevolucion, "Libro no disponible para estas fechas", "Libro disponible para su reserva") as reservar from reserva`;
  const [reserveDate] = pool.query(query, idlibro);

  return reserveDate;
}

module.exports = {
  addReserve,
  checkStock,
  checkReserveDate,
  decreaseBookStock,
  eraseReserve,
  findReserveByUserId,
  modifyReserve,
  readAll,
};
