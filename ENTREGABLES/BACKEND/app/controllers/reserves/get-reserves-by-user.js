'use strict';

const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');

const schema = Joi.number().positive().required();


async function getReservesByUserId(req, res) {
    try {

        const { userId } = req.params;

        await schema.validateAsync(userId);

        const userReserve = await reservesRepository.findReserveByUserId(userId);

        if(!userReserve) {
            throw new Error('No se ha encontrado reserva asociada a este usuario.')
        }

        res.status(200).send(userReserve);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    getReservesByUserId,
}