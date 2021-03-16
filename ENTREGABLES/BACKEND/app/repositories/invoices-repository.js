"use strict";
const database = require("../infrastructure/database");
const {
  createDetail,
  readDetailsByInvoce,
} = require("../repositories/details-repository");

async function readInvoicesByUser(userID) {
  console.log(userID);
  const pool = await database.getPool();
  const query =
    "select f.*,u.* from factura f inner join detalle d on f.idfactura=d.idfactura inner join libro l on d.idlibro=l.idlibro inner join usuario u on u.idusuario=f.idusuario where u.idusuario=? group by f.idfactura";
  const [invoices] = await pool.query(query, userID);
  console.log("hicimos el select, empezamos el for");
  for (let i = 0; i < invoices.length; i++) {
    const details = await readDetailsByInvoce(pool, invoices[i].idfactura);
    invoices[i].details = details;
    console.log(invoices[i]);
  }
  return invoices;
}

async function findLastInvoiceId() {
  const pool = await database.getPool();

  const query =
    "select max(factura.idfactura) as idfactura from proyectoFinalBookNGo.factura";
  const [invoiceId] = await pool.query(query);
  console.log([invoiceId[0]]);
  const generatedNewInvoiceId = invoiceId[0].idfactura + 1;
  console.log("gee" + generatedNewInvoiceId);
  return generatedNewInvoiceId;
}

async function insertInvoice(invoice, details) {
  const pool = await database.getPool();

  try {
    await pool.query("START TRANSACTION");
    const idfactura = await findLastInvoiceId();
    console.log("ESTE ES EL ID DE LA FASCTURA" + idfactura);

    const query =
      "INSERT INTO factura (idfactura,idusuario,fecha,iva,precioenvio,total) values (?,?,?,?,?,?)";

    const { idusuario, fecha, iva, precioenvio, total } = invoice;

    const [invoices] = await pool.query(query, [
      idfactura,
      idusuario,
      fecha,
      iva,
      precioenvio,
      total,
    ]);
    let totalR = total;

    for (let i = 0; i < details.length; i++) {
      details[i].idfactura = idfactura;
      details[i].iddetalle = i + 1;
      await createDetail(details[i]);
      totalR = totalR + parseInt(details[i].precio);
    }
    totalR = totalR + parseInt(precioenvio);

    await updateInvoice(parseInt(totalR), idfactura);
    await pool.query("COMMIT");

    return invoices;
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log("ROLLBACK de las operaciones", err);
    throw err;
  }
}

async function updateInvoice(total, idfactura) {
  const pool = await database.getPool();
  const query = "UPDATE factura set total=? where idfactura=?";
  const update = await pool.query(query, [total, idfactura]);
  return update;
}
module.exports = { readInvoicesByUser, insertInvoice, updateInvoice };
