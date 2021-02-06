'use strict';

const { date } = require('joi');
const Joi = require('joi');

const reserveRepository = require('../../repositories/reserve-repository');


const schema = Joi.object().keys({
  idusuario: Joi.number().positive().required(),
  idlibro: Joi.number().positive().required(),
  fechareserva: Joi.required(),
  fechadevolucion: Joi.required(),
  rating: Joi.number().required(),
});

async function createReserve(req, res) {
    try {

        const {
            idusuario,
            idlibro,
            fechareserva,
            fechadevolucion,
            rating,
        } = req.body;

        // if(req.body) {
        //   const error = new Error('Esta reserva ya existe.');
        //   throw error;
        // }

        const reserveStock = await reserveRepository.checkStock(req.body.idlibro);

        if(!reserveStock) {
          const error = new Error('Este libro no esta disponible actualmente.');
          throw error;
        }

        const decreaseStock = await reserveRepository.decreaseBookStock(req.body.idlibro);

        await schema.validateAsync(req.body);

        // const now = new Date();
        // const reserveDate = req.body.fechareserva;
        // const reserveDevolution = now.setMonth(now.getMonth() + 1);
        // console.log(reserveDate, reserveDevolution);
        
        const reserve = {
          idusuario,
          idlibro,
          fechareserva,
          fechadevolucion,
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
}