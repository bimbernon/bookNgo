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

async function readDetailsByInvoce (pool,invoiceID) {
    
const query = 'select d.*,l.*,c.* from detalle d inner join libro l on d.idlibro=l.idlibro inner join categoria c on c.idcategoria=l.idcategoria where d.idfactura=?';
const details = await pool.query(query,invoiceID);
return details[0];

}
module.exports = {createDetail,readDetailsByInvoce};

