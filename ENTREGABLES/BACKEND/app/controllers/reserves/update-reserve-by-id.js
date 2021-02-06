'use strict';

const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');

const schema = Joi.number().positive().required();


async function updateReserveById(req, res) {
    try {

        const { reserveId } = req.params;

        await schema.validateAsync(reserveId);

        const reserve = await reservesRepository.findReserveId(reserveId);

        if(!reserve) {
            throw new Error('No se ha encontrado reserva con ese id.');
        }

        const {
            fechareserva,
            fechadevolucion,
            rating,
        } = req.body;

        if(req.body) {
            const error = new Error('Estas introduciendo datos existentes.');
            throw error;
        }

        const updatedReserve = {
            fechareserva,
            fechadevolucion,
            rating,
        }
        // console.log(updatedReserve);

        await reservesRepository.modifyReserveById(reserveId, updatedReserve);

        res.status(200).send({ message: 'La reserva se ha modificado correctamente.' })

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    updateReserveById,
}