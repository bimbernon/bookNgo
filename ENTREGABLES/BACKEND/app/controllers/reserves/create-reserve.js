"use strict";

const Joi = require('joi');

const reserveRepository = require('../../repositories/reserve-repository');

const schema = Joi.object().keys({
  idlibro: Joi.number().positive().required(),
  fechareserva: Joi.required(),
  fechadevolucion: Joi.required(),
  rating: Joi.number().required(),
});

async function createReserve(req, res) {
    try {

      const { idusuario } = req.auth;

        const {
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        } = req.body;

        await schema.validateAsync(req.body);

        const reserveStock = await reserveRepository.checkStock(req.body.idlibro);

        if(!reserveStock) {
          const error = new Error('Este libro no esta disponible actualmente.');
          throw error;
        } 

        await reserveRepository.decreaseBookStock(req.body.idlibro);

        const reserve = {
          idusuario,
          idlibro,
          reserveDate,
          endReserveDate,
          rating,
        }

        await reserveRepository.addReserve(reserve);
      
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
};
