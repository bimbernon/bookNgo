"use strict";

const { insertInvoice } = require('../../repositories/invoices-repository');

async function createInvoice(req, res) {
    try {
        const total = 0.00;
        
        const {
            idfactura,
            idusuario,
            fecha,
            iva,
            precioenvio,
            detalles

        } = req.body;

        const invoice = {
            idfactura,
            idusuario,
            fecha,
            iva,
            precioenvio,
            total
        };
   
        console.log("ANTES DE CREAR LA FACTURA EL NUMERO DE FACTURA VALE " +invoice.idfactura)
         await insertInvoice(invoice,detalles)
         res.send('BIEN CREADA LA FACTURA');
         
    } catch (err) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    }
}
module.exports = {createInvoice};