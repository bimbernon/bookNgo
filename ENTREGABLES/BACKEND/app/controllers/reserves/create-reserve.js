'use strict';

const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');


// const schema = Joi.object().keys({
//     fechareserva: Joi.date().required(),
//     fechadevolucion: Joi.date().required(),
//     rating: Joi.number().required(),
// })

async function createReserve(req, res) {
    try {

        const {
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        }
    
        const reserve = {
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        }
    
        const reserves = await reservesRepository.addReserve(reserve);
    
        res.status(200).send({
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        })

    } catch(err) {
        res.status(400).send({ error: err.message });
    }

}



module.exports = {
    createReserve,
}