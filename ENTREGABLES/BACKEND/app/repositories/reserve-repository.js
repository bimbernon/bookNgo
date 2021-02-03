'use strict';

const { func } = require('joi');
const database = require('../infrastructure/database');


async function findUserId(userId) {
  const pool = await database.getPool();
  const query = `SELECT idusuario FROM reserva WHERE idusuario=?`;
  const [reserve] = await pool.query(query, userId);

  return reserve;
}

async function readAll() {
    const pool = await database.getPool();
    const query = `SELECT * FROM reserva`;
    const [ reserve ] = await pool.query(query);

    return reserve;
}

async function findReserveByUserId(reserve) {
    const pool = await database.getPool();
    const query = `select fechareserva, fechadevolucion from reserva join usuario using(idusuario) where idusuario=?`;
    const [ reserveByUser ] = await pool.query(query, reserve);

    return reserveByUser[0];
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
    console.log(idreserva);

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

async function modifyReserveById(reserveId, updateReserve) {

    const { 
        fechareserva, 
        fechadevolucion, 
        rating
    } = updateReserve;

    console.log(updateReserve);

    const pool = await database.getPool();
    const query = `UPDATE reserva SET fechareserva=?, fechadevolucion=?, rating=? WHERE idreserva=?`;

    await pool.query(query, [
        fechareserva,
        fechadevolucion,
        rating,
        reserveId,
    ])

    return true;
}

async function deleteReserve(reserveId) {
    const pool =  await database.getPool();
    const query = `DELETE FROM reserva WHERE idreserva=?`;
    const [ deletedReserve ] = await pool.query(query, reserveId);

    return true;
}




module.exports = {
    addReserve,
    deleteReserve,
    findUserId,
    findLastReserveId,
    findReserveId,
    findReserveByUserId,
    modifyReserveById,
    readAll,
}