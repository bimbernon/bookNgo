'use strict'

const { detailsRepository } = require('../../repositories/details-repository');
const Joi = require('joi');

const schema = Joi.object().keys({
    idfactura : Joi.number().positive().required(),
    iddetalle: Joi.number().positive().required(),
    idlibro: Joi.number().positive().required(),
    precio: Joi.number().min(4).max(40).required(),
});
async function createDetail(req, res) {
    try {
        const { idfactura, iddetalle, idlibro, precio } = req.body;
        await schema.validateAsync(req.body);
        const detail = {
            idfactura,
            iddetalle,
            idlibro,
            precio
        };
        await detailsRepository.createDetail(detail);
        res.send('BIEN CREADO EL DETALLE');
    } catch (err) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    }
}
module.exports= {createDetail}