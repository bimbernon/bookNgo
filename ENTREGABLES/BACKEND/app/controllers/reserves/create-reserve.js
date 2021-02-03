'use strict';

const Joi = require('joi');

const reserveRepository = require('../../repositories/reserve-repository');


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
        } = req.body;

        // const now = new Date();
        // const reserveDate = now;
        // const reserveDevolution = now.setMonth(now.getMonth() + 1);
        // console.log(reserveDate, reserveDevolution);
    
        const reserve = {
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        }
        console.log(reserve);

        const newReserve = await reserveRepository.addReserve(reserve);
    
        res
          .status(200)
          .send({
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
          });

    } catch(err) {
         res.status(err.status || 500);
         res.send({ error: err.message });
    }

}



module.exports = {
    createReserve,
}