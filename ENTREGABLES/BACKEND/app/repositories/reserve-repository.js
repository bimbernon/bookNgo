"use strict";

const { isError } = require("joi");
const Joi = require("joi");
const database = require("../infrastructure/database");
const { dateFormatted } = require("../helpers/date");

async function readAll() {
  const pool = await database.getPool();
  const query = `select u.idusuario, u.nombreusuario, l.titulo, r.fechareserva, r.fechadevolucion, r.rating from reserva r inner join libro l on r.idlibro = l.idlibro inner join usuario u on r.idusuario = u.idusuario`;
  const [reserve] = await pool.query(query);

  return reserve;
}

async function findFirstReserveToEnd(bookId) {
  const pool = await database.getPool();
  const query = `select min(fechadevolucion) as fechadevolucion from reserva where idlibro=?`;
  const [reserve] = await pool.query(query, bookId);
  console.log("MES" + reserve[0].fechadevolucion.getMonth());
  reserve[0].fechadevolucion = dateFormatted(
    new Date(reserve[0].fechadevolucion),
    "/"
  );
  console.log(dateFormatted(new Date(reserve[0].fechadevolucion + ""), "/"));
  return reserve;
}

async function findReserveByUserId(userId) {
  const pool = await database.getPool();
  const query = `select * from libro l inner join reserva r on l.idlibro = r.idlibro where r.idusuario=?`;
  const [reserveByUser] = await pool.query(query, userId);

  console.log(reserveByUser);

  return reserveByUser;
}

async function findReserveByUserDateBook(reserveData) {
  const { idusuario, idlibro, fechareserva } = reserveData;
  const pool = await database.getPool();
  const query = `SELECT * FROM reserva WHERE idusuario=? AND idlibro=? AND fechareserva=?`;
  const [reserve] = await pool.query(query, [idusuario, idlibro, fechareserva]);

  return reserve;
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

    await pool.query("COMMIT");

    return addedReserve;
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log("ROLLBACK de las operaciones", err);
    throw err;
  }
}

async function decreaseBookStock(idlibro) {
  const pool = await database.getPool();
  const query = `update libro set stock = stock - 1 where idlibro = ?`;
  const [bookStock] = await pool.query(query, idlibro);

  return true;
}

async function modifyReserve(updateReserve) {
  const { idlibro, idusuario, fechareserva, rating } = updateReserve;
  const pool = await database.getPool();
  const query = `UPDATE reserva SET rating=? WHERE idusuario=? AND idlibro=? AND fechareserva=?`;
  await pool.query(query, [rating, idusuario, idlibro, fechareserva]);

  return true;
}

async function eraseReserve(userId, bookId, reserveDate) {
  const pool = await database.getPool();
  const query = `DELETE FROM reserva WHERE idusuario=? AND idlibro=? AND fechareserva=?`;
  const [deletedReserve] = await pool.query(query, [
    userId,
    bookId,
    reserveDate,
  ]);

  return deletedReserve;
}

async function checkReserveDate(idlibro) {
  const pool = await database.getPool();
  const query = `select idlibro, fechareserva, fechadevolucion, if(fechareserva < fechadevolucion, "Libro no disponible para estas fechas", "Libro disponible para su reserva") as reservar from reserva`;
  const [reserveDate] = pool.query(query, idlibro);

  return reserveDate;
}

async function checkPurse(idusuario) {
  const pool = await database.getPool();
  const query = `select monedero from usuario where idusuario=? `;
  const [purse] = await pool.query(query, idusuario);

  return purse[0].monedero;
}

async function decreasePurse(idusuario) {
  const pool = await database.getPool();
  const query = `update usuario set monedero = monedero - 1 where idusuario=?`;
  const [updatedPurse] = await pool.query(query, idusuario);

  return true;
}

module.exports = {
  addReserve,
  checkPurse,
  checkReserveDate,
  decreaseBookStock,
  decreasePurse,
  eraseReserve,
  findFirstReserveToEnd,
  findReserveByUserId,
  findReserveByUserDateBook,
  modifyReserve,
  readAll,
};
