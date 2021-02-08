"use strict";

const Joi = require("joi");

const reservesRepository = require("../../repositories/reserve-repository");

const schema = Joi.number().positive().required();

async function deleteReserve(req, res) {
  try {
    const authentifiedUserId = req.auth.idusuario;

    if (!req.auth) {
      //COMPROBAR QUE EL ID DE LA RESERVA DEL PARAMS CORRESPONDA CON UNA RESERVA DEL USUARIO AUTENTIFICADO
      const error = new Error("No tienes permisos para realizar esta acción");
      // if (authentifiedUserId !== parseInt(userId)) {
      //   const error = new Error(
      //     "No tienes permisos para realizar esta acción."
      //   );
      //   throw error;
      // }
    }

    const { bookId } = req.params;

    await reservesRepository.eraseReserve(authentifiedUserId, bookId);

    res
      .status(200)
      .send({ message: "La reserva se ha eliminado correctamente." });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  deleteReserve,
};
