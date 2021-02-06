"use strict";

const Joi = require("joi");
const database = require("../infrastructure/database");

async function readAll() {
    const pool = await database.getPool();
    const query = `select r.idreserva, u.idusuario, u.nombreusuario, l.titulo, r.fechareserva, r.fechadevolucion, r.rating from reserva r inner join libro l on r.idlibro = l.idlibro inner join usuario u on r.idusuario = u.idusuario`;
    const [ reserve ] = await pool.query(query);

  return reserve;
}

async function findReserveByUserId(userId) {
    const pool = await database.getPool();
    const query = `select r.idreserva, l.titulo, r.fechareserva, r.fechadevolucion, l.precio from libro l inner join reserva r on l.idlibro = r.idlibro where r.idusuario=?`;
    const [ reserveByUser ] = await pool.query(query, userId);

    return reserveByUser;
}

async function findReserveId(id) {
  const pool = await database.getPool();
  const query = `SELECT * FROM reserva WHERE idreserva=?`;
  const [reserve] = await pool.query(query, id);

  return reserve;
}

async function findLastReserveId() {
  const pool = await database.getPool();
  const query = "SELECT max(idreserva) as lastReserveId from reserva";
  let [id] = await pool.query(query);

  const generatedId = id[0].lastReserveId + 1;
  return generatedId;
}

async function addReserve(reserve) {
    
    const pool = await database.getPool();
    const idreserva = await findLastReserveId();

    const {
        idusuario,
        idlibro,
        fechareserva,
        fechadevolucion,
        rating,
    } = reserve;

    const query = `INSERT INTO reserva (idreserva, idusuario, idlibro, fechareserva, fechadevolucion, rating) VALUES (?,?,?,?,?,?)`;

    const [ addedreserve ]  = await pool.query(query, [
        idreserva,
        idusuario,
        idlibro,
        fechareserva,
        fechadevolucion,
        rating,
    ]);

    return true;
}

async function checkStock() {
    const pool = await database.getPool();
    const query = `select stock, if (stock > 0, "Hay stock", "No hay stock") as disponibilidad from libro;`;
    const [ stock ] = await pool.query(query);

    return stock[0].stock;
}

async function decreaseBookStock(idlibro) {
    const pool = await database.getPool();
    const query = `update libro set stock = stock - 1 where idlibro = ?`;
    const [ bookStock ] = pool.query(query, idlibro);

    return bookStock;
}

async function modifyReserveById(reserveId, updateReserve) {
  const { fechareserva, fechadevolucion, rating } = updateReserve;

  console.log(updateReserve);

  const pool = await database.getPool();
  const query = `UPDATE reserva SET fechareserva=?, fechadevolucion=?, rating=? WHERE idreserva=?`;

  await pool.query(query, [fechareserva, fechadevolucion, rating, reserveId]);

  return true;
}

async function deleteReserve(reserveId) {
  const pool = await database.getPool();
  const query = `DELETE FROM reserva WHERE idreserva=?`;
  const [deletedReserve] = await pool.query(query, reserveId);

  return true;
}

async function checkReserveDate(idlibro) {
    const pool = await database.getPool();
    const query = `select idlibro, fechareserva, fechadevolucion, if(fechareserva < fechadevolucion, "Libro no disponible para estas fechas", "Libro disponible para su reserva") as reservar from reserva`;
    const  [ reserveDate ] = pool.query(query, idlibro);

    return reserveDate;
}




module.exports = {
    addReserve,
    checkStock,
    checkReserveDate,
    decreaseBookStock,
    deleteReserve,
    findLastReserveId,
    findReserveId,
    findReserveByUserId,
    modifyReserveById,
    readAll,
}
