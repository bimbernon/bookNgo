"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");

const schema = Joi.number().positive().required();

async function getUserById(req, res) {
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

    schema.validateAsync(userId);

    const user = await findUserById(userId);

    if (!user) {
      const error = new Error("No existe ningún usuario con ese ID");
      error.status = 400;
      throw error;
    }

    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUserById };
