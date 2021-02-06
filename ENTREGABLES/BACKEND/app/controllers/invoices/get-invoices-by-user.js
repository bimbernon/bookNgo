'use strict'
const { readInvoicesByUser } = require('../../repositories/invoices-repository');
const { formatArrayInvoices } = require('../../helpers/invoices/usefulMethods');
const Joi = require('joi');
const schemaId = Joi.number().positive().required();
async function getInvoicesByUser(req, res) {
    try {
        const { admin } = req.auth;

        if (admin !== 1) {
            const error = new Error("No tienes permisos para realizar esta acción");
            error.status = 403;
            throw error;
        }
        const { userID } = req.params;
        await schemaId.validateAsync(userID);
        const invoices = await readInvoicesByUser(userID);

        if (!invoices) {
            throw new Error('No se encontraron libros para esa editorial')
        }
        const User = {
            name: invoices[0].nombreusuario,
            lastname1: invoices[0].apel1,
            lastname2: invoices[0].apel2,
            profilename: invoices[0].nombreperfilusuario,
            email: invoices[0].email,
            photo: invoices[0].codFoto
        }
        const Invoice = formatArrayInvoices(invoices);
        const resultinvoice = {
            User,
            Invoice
        }
        res.send(resultinvoice);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports = { getInvoicesByUser };
