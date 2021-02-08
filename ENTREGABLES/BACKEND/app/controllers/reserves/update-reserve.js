'use strict';

const Joi = require('joi');

const reserveRepository = require('../../repositories/reserve-repository');

// const schema = Joi.object.keys({
//     fechareserva: Joi.required(),
//     fechadevolucion: Joi.require(),
//     rating: Joi.number().positive(),
// })

async function updateReserve(req, res) {
    try {
        const authentifiedUserId = req.auth.idusuario;

        if (req.auth.admin !== 1) {
          if (authentifiedUserId !== parseInt(userId)) {
            const error = new Error(
              "No tienes permisos para realizar esta acción."
            );
            throw error;
          }
        }

        const { idusuario } = req.auth;

        const { bookId, reserveDate } = req.params;
        console.log(req.params);

        const {fechareserva, fechadevolucion, rating } = req.body;

        const updatedReserve = {
            fechareserva,
            fechadevolucion,
            rating,
        }
        console.log(updatedReserve, 'hola');// aqui llegamos

        await reserveRepository.modifyReserve(idusuario, bookId, reserveDate, updatedReserve);

        res.status(200).send({
            idusuario,
            bookId,
            fechareserva,
            fechadevolucion,
            rating,
        });

    } catch(err) {
        res.status(400).send( { err: err.message });
    }
}


module.exports = {
    updateReserve,
}