"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");

// const schema = Joi.object().keys({
//     idlibro: Joi.number().positive().require(),
// })

async function getReserveByUserDateBook(req, res) {
  try {
    const { admin } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const { userId, bookId, reserveDate } = req.body;

    const reserveData = {
      idusuario: req.body.idusuario,
      idlibro: req.body.idlibro,
      fechareserva: req.body.fechareserva,
    };

    const reserve = await reserveRepository.findReserveByUserDateBook(
      reserveData
    );

    res.status(200).send(reserve);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  getReserveByUserDateBook,
};
