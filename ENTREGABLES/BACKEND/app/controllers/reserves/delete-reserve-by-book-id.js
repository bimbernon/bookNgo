"use strict";

const Joi = require("joi");

const reservesRepository = require("../../repositories/reserve-repository");

const schema = Joi.number().positive().required();

async function deleteReserve(req, res) {
  try {
    const authentifiedUserId = req.auth.idusuario;

    if (!req.auth) {
      const error = new Error("No tienes permisos para realizar esta acción");
    }

    const { bookId } = req.params;

    const { date } = req.body;
    console.log(date);

    const reserve = await reservesRepository.eraseReserve(
      authentifiedUserId,
      bookId,
      req.body.fechareserva
    );

    if (reserve === undefined) {
      // no salta error cuando reserve es undefinded
      const error = new Error(
        `No existe reserva con estos datos:
         userId:${authentifiedUserId},
         bookId${bookId}, 
         fechareserva:${req.body.fechareserva}`
      );
      throw error;
    }

    res.status(200).send(reserve);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  deleteReserve,
};
