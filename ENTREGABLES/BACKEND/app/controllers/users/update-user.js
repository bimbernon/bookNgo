"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const {
  updateUser,
  findUserById,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).optional(),
  userProfileName: Joi.string().alphanum().min(3).max(20).optional(),
  password: Joi.string().min(3).max(200).optional(),
  lastName1: Joi.string().alphanum().min(3).max(20).optional(),
  lastName2: Joi.string().alphanum().min(3).max(20).optional(),
});

// const schemaPassword = Joi.object().keys({
//   password: Joi.string().min(3).max(200).required(),
// });

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

    //CAMBIAR SI CAMBIA EL SCRIPT A INGLES
    const formatedUser = {
      name: userById.nombreusuario,
      userProfileName: userById.nombreperfilusuario,
      password: userById.contraseña,
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
