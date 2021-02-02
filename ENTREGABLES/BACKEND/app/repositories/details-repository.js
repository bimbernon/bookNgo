'use strict';

const database = require('../infrastructure/database');

async function createDetail(detail) {
    const pool = await database.getPool();
    const query = 'INSERT INTO detalle (idfactura,iddetalle,idlibro,precio) values (?,?,?,?)';
    const {
        idfactura,
        iddetalle,
        idlibro,
        precio
    } = detail;
    await pool.query(query,[idfactura,iddetalle,idlibro,precio]);
    return true;
}
module.exports = {createDetail};

