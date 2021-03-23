"use strict";

const Joi = require("joi");

const reservesRepository = require("../../repositories/reserve-repository");

const schema = Joi.number().positive().required();

async function getReservesByUserId(req, res) {
    try {
      const { userId } = req.params;
      const authentifiedUserId = req.auth.idusuario;

      if (req.auth.admin !== 1) {
        if (authentifiedUserId !== parseInt(userId)) {
          const error = new Error(
            "No tienes permisos para realizar esta acción."
          );
          throw error;
        }
      }

        await schema.validateAsync(userId);

        const userReserve = await reservesRepository.findReserveByUserId(userId);

        if(!userReserve) {
            throw new Error('No se ha encontrado reserva asociada a este usuario.')
        }

        res.status(200).send(userReserve);
        console.log(userReserve);

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
}

module.exports = {
  getReservesByUserId,
};
