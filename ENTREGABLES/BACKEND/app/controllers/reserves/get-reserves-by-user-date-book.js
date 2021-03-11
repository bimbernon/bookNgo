"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");

const schema = Joi.object().keys({
  idusuario: Joi.number().positive().required(),
  idlibro: Joi.number().positive().required(),
  fechareserva: Joi.required(),
});

// /search/:idusuario/:idlibro/:fechareserva

async function getReserveByUserDateBook(req, res) {
  try {
    const { userId } = req.params.idusuario;
    const authentifiedUserId = req.auth.idusuario;

    if (req.auth.admin !== 1) {
      if (authentifiedUserId !== parseInt(userId)) {
        const error = new Error(
          "No tienes permisos para realizar esta acción."
        );
        throw error;
      }
    }

    const { idusuario, idlibro, fechareserva } = req.params;

    const reserveData = {
      idusuario: idusuario,
      idlibro: idlibro,
      fechareserva: fechareserva,
    };

    await schema.validateAsync(reserveData);

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
