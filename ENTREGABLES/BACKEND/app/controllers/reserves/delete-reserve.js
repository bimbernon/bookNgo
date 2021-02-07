'use strict';


const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');

const schema = Joi.number().positive().required();


async function deleteReserve(req, res) {
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

        const { bookId } = req.params;

        await reservesRepository.eraseReserve(idusuario, bookId);

        res.status(200).send({ message: 'La reserva se ha eliminado correctamente.'})

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    deleteReserve,
}