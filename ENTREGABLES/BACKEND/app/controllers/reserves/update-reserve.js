"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");

async function updateReserve(req, res) {
  try {
    // const authentifiedUserId = req.auth.idusuario;

    if (!req.auth) {
      //COMPROBAR QUE LA RESERVA A MODIFICAR SEA DEL USUARUI LOGGEADO
      const error = new Error("NO tienes permisos para realizar esta acción");
      // if (authentifiedUserId !== parseInt(userId)) {
      //   const error = new Error(
      //     "No tienes permisos para realizar esta acción."
      //   );
      //   throw error;
      // }
    }

    const { idusuario } = req.auth;

    const { bookId, reserveDate } = req.params;

    const { rating } = req.body;

    const updatedReserve = {
      bookId: bookId,
      userId: idusuario,
      reserveDate: reserveDate,
      rating: rating,
    };
    console.log(updatedReserve, "hola"); // aqui llegamos

    await reserveRepository.modifyReserve(updatedReserve);

    res.status(200).send({
      bookId: bookId,
      userId: idusuario,
      reserveDate: reserveDate,
      rating: rating,
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
}

module.exports = {
  updateReserve,
};
