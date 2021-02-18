"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");

const schema = Joi.object().keys({
  idusuario: Joi.number().positive().required(),
  idlibro: Joi.number().positive().required(),
  fechareserva: Joi.required(),
  rating: Joi.number().positive().required(),
});

async function updateReserve(req, res) {
  try {
    if (!req.auth) {
      const error = new Error("NO tienes permisos para realizar esta acción");
    }

    const { idusuario } = req.auth;

    const { bookId, reserveDate } = req.params;

    const { rating } = req.body;

    const updatedReserve = {
      idusuario: idusuario,
      idlibro: bookId,
      fechareserva: reserveDate,
      rating: rating,
    };

    await schema.validateAsync(updatedReserve);

    const checkedReserve = await reserveRepository.findReserveByUserDateBook(
      updatedReserve
    );

    if (checkedReserve[0] === undefined) {
      const error = new Error("Esta reserva no existe.");
      throw error;
    }
    await reserveRepository.modifyReserve(updatedReserve);

    res.status(200).send({
      idusuario: idusuario,
      idlibro: bookId,
      fechareserva: reserveDate,
      rating: rating,
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
}

module.exports = {
  updateReserve,
};
