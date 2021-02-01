'use strict';

const { async } = require('crypto-random-string');
const { func } = require('joi');
const database = require('../infrastructure/database');


async function readAll() {

    const pool = await database.getPool();
    const query = `SELECT * FROM tarjeta`;
    const [ card ] = await pool.query(query);

    return card;
}


async function findLastCardId() {

  const pool = await database.getPool();
  const query = "SELECT max(idtarjeta) as ultimoID from tarjeta";
  let [ id ] = await pool.query(query);

  const generateNewId = id[0].ultimoID + 1;
  return generateNewId;
}

async function addCard(cards) {

    const pool = await database.getPool();
    const id = await findLastCardId();

    const { 
        numerotarjeta,
        idusuario, 
        fechaExpiracion, 
        csv } = cards;

    const query = `INSERT INTO tarjeta ( idtarjeta, numerotarjeta, idusuario, fechaExpiracion, csv) VALUES (?,?,?,?,?)`;

    const [ card ] = await pool.query(query, [
        id,
        numerotarjeta,
        idusuario,
        fechaExpiracion,
        csv,
    ]);

    return card;
}



module.exports = {
    readAll,
    addCard,
}