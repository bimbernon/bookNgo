'use strict';

const Joi = require('joi');

const reservesRepository = require("../../repositories/reserve-repository");

const schema = Joi.object().keys({
    idlibro: Joi.number().positive().required(),
})

async function getFirstReseveToEndByBookId (req, res) {
    try {
        const {idlibro} = req.params;

        await schema.validateAsync(req.params);

        const reserveData = await reservesRepository.findFirstReserveToEnd(idlibro);
        if(!reserveData) {
            throw new Error("No se ha encontrado la fecha mas proxima")
        }
        res.status(200).send(reserveData);

    } catch (err) {
        const error = new Error("Algo ha salido mal..");
        throw error;
    }
}

module.exports = {getFirstReseveToEndByBookId};