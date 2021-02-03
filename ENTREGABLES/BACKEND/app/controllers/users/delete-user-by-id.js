"use strict";

const Joi = require("joi");
const {
  findUserById,
  eraseUser,
} = require("../../repositories/users-repository");

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    // if (req.auth.admin !== 1) {
    //   const error = new Error("No tienes permisos para realizar esta acción");
    //   error.status = 403;
    //   throw error;
    // }
    const { userId } = req.params;
    await schema.validateAsync(userId);

    const user = await findUserById(userId);

    // if (user.admin !== 0) {
    //   const error = new Error("No tienes permisos para realizar esta acción");
    //   error.status = 403;
    //   throw error;
    // }

    if (!user) {
      const error = new Error("Usuario no existe");
      error.status = 400;
      throw error;
    }

    await eraseUser(userId);

    res.send({ message: `Usuario borrado con éxito` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { deleteUserById };
