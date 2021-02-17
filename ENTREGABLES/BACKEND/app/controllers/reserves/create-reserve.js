"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");
const { checkStockBook } = require("../../repositories/books-repository");
const { addDateDays } = require("../../helpers/date");

const schema = Joi.object().keys({
  idlibro: Joi.number().positive().required(),
});

async function createReserve(req, res) {
  try {
    const { idusuario } = req.auth;

    const { idlibro } = req.body;


    await schema.validateAsync(req.body);
    
    let lookPurse = await reserveRepository.checkPurse(idusuario)

    if(lookPurse < 1) {
      const error = new Error('Saldo insuficiente. Recarga tu monedero para continuar con la reserva');
      throw error;
    }

    let updatePurse = await reserveRepository.decreasePurse(idusuario);

    const reserveStock = await checkStockBook(idlibro);

    if (reserveStock === 0) {
      const error = new Error("Este libro no esta disponible actualmente.");
      throw error;
    }


    const reserveDate = new Date();
    const reserveDevolution = addDateDays(new Date(), 30);
    const rating = null;

    const reserve = {
      idusuario: idusuario,
      idlibro,
      fechareserva: reserveDate,
      fechadevolucion: reserveDevolution,
      valoracion: rating,
    };

    await reserveRepository.addReserve(reserve);

    res.status(200).send({
      idusuario: idusuario,
      idlibro,
      fechareserva: reserveDate,
      fechadevolucion: reserveDevolution,
      valoracion: rating,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  createReserve,
};
