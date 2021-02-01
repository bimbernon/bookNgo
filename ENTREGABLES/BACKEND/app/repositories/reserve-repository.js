'use strict';

const database = require('../infrastructure/database');


async function addReserve(reserve) {
    
    const pool = await database.getPool();

    const {
        idusuario,
        idlibro,
        fechareserva,
        fechadevolucion,
        rating,
    }

    const query = `INSERT INTO reserva (idusuario, idlibro, fechareserva, fechadevolucion, rating) VALUES (?,?,?,?,?)`;

    const reserve = {
        idusuario,
        idlibro,
        fechareserva,
        fechadevolucion,
        rating,
    }

    return reserve;
}




module.exports = {
    addReserve,
}