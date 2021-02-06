"use strict";

const { insertInvoice } = require('../../repositories/invoices-repository');
const Joi = require('joi');
const schema = Joi.object().keys({
    idfactura: Joi.number().positive().required(),
    idusuario: Joi.number().positive().required(),
    fecha: Joi.date().required(),
    iva: Joi.number().positive().required(),
    precioenvio: Joi.number().positive().required(),
    detalles: Joi.array().items(Joi.object({
        idfactura: Joi.number().positive().required(),
        iddetalle: Joi.number().positive().required(),
        idlibro: Joi.number().positive().required(),
        precio: Joi.number().positive().required()
    }))
});

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

        await schema.validateAsync(req.body);

        const invoice = {
            idfactura,
            idusuario,
            fecha,
            iva,
            precioenvio,
            total
        };

        await insertInvoice(invoice, detalles);

        res.send('SE HA AÑADIDO CORRECTAMENTE LA FACTURA');

    } catch (err) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    }
}
module.exports = { createInvoice };