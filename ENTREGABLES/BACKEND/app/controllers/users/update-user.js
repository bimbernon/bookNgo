"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const {
  updateUser,
  findUserById,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .error(new Error("El nombre debe tener al menos 3 caracteres.")),
  userProfileName: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .error(new Error("El nombre de usuario debe tener al menos 3 caracteres.")),
  address: Joi.string()
    .min(5)
    .max(80)
    .optional()
    .error(new Error("La direccion debe tener al menos 5 caracteres.")),
  lastName1: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .error(new Error("El apellido debe contener al menos 3 caracteres")),
  lastName2: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .error(new Error("El apellido debe contener al menos 3 caracteres")),
});

async function updateUserById(req, res) {
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
    const userById = await findUserById(userId);

    if (userById.idusuario !== parseInt(userId)) {
      const error = new Error("No existe ningun usuario con ese id");
      error.status = 409;
      throw error;
    }

    await schema.validateAsync(req.body);

    const formatedUser = {
      name: userById.nombreusuario,
      userProfileName: userById.nombreperfilusuario,
      address: userById.direccion,
      lastName1: userById.apel1,
      lastName2: userById.apel2,
    };

    const updatedUser = {
      ...formatedUser,
      ...req.body,
    };

    await updateUser(parseInt(userId), updatedUser);

    res.send({
      message: "Actualizado correctamente",
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { updateUserById };
