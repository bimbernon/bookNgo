"use strict";
const { dateFormatted } = require("../../helpers/date");
const { insertInvoice } = require("../../repositories/invoices-repository");
const Joi = require("joi");
const schema = Joi.object().keys({
  idfactura: Joi.number().positive().required(),
  iva: Joi.number().positive().required(),
  precioenvio: Joi.number().positive().required(),
  detalles: Joi.array().items(
    Joi.object({
      idlibro: Joi.number().positive().required(),
      precio: Joi.number().positive().required(),
    })
  ),
});

async function createInvoice(req, res) {
  try {
    const { idusuario } = req.auth;
    const total = 0.0;
    const fecha = dateFormatted(new Date(), "-");
    const iva = 21;
    const precioenvio = 3;
    const { detalles } = req.body;

    await schema.validateAsync(req.body);

    const invoice = {
      idusuario,
      fecha,
      iva,
      precioenvio,
      total,
    };

    const invoiceCreated = await insertInvoice(invoice, detalles);

    res.send({ invoiceCreated });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
module.exports = { createInvoice };
