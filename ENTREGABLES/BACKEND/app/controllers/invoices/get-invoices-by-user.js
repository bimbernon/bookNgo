'use strict'
const { readInvoicesByUser } = require('../../repositories/invoices-repository');
const {formatArrayInvoices} = require('../../helpers/invoices/usefulMethods');
const joi = require('Joi');
const schemaId = joi.number().positive().required();
async function getInvoicesByUser(req, res) {
    try {
        const { userID } = req.params;
        await schemaId.validateAsync(userID);
        const invoices = await readInvoicesByUser(userID);
     
        if (!invoices) { // Preguntar por que no entra por este if
            throw new Error('No se encontraron libros para esa editorial')
        }
        const formattedInvoices = formatArrayInvoices(invoices);
        res.send(formattedInvoices);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports={getInvoicesByUser};
