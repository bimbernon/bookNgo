'use strict';


const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');

const schema = Joi.number().positive().required();


async function deleteReserveById(req, res) {
    try {

        const { reserveId } = req.params;
        console.log(reserveId);

        await schema.validateAsync(reserveId);

        const reserveUserId = await reservesRepository.findLastReserveId(reserveId);

        if(!reserveUserId) {
            throw new Error('No se ha encontrado reserva con ese id.');
        }

        await reservesRepository.deleteReserve(reserveId);

        res.status(200).send({ message: 'La reserva se ha eliminado correctamente.'})

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    deleteReserveById,
}