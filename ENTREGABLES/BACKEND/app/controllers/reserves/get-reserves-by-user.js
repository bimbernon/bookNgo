'use strict';

const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');

const schema = Joi.number().positive().required();


async function getReservesByUserId(req, res) {
    try {

        const { userId } = req.params;
        console.log(userId);

        await schema.validateAsync(userId);

        const user = await reservesRepository.findUserId(userId);
        console.log(user);

        if(!user) {
            throw new Error('No se ha encontrado reserva asociada a este usuario.')
        }

        const reserve = await reservesRepository.findReserveByUserId(userId);
        console.log(reserve);

        res.status(200).send(reserve);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    getReservesByUserId,
}