"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const {
  updatePassword,
  findUserById,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  password: Joi.string().min(3).max(40).required(),
  newPassword: Joi.string().min(3).max(40).required(),
});

async function updateUserPassword(req, res) {
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

    const user = await findUserById(userId);

    const { password, newPassword } = req.body;
    await schema.validateAsync(newPassword);

    const newPasswordHash = await bcrypt.hash(newPassword, 1);

    const confirmPassword = await bcrypt.compare(password, user.contraseña);
    if (!confirmPassword) {
      const error = new Error("Contraseña incorrecta");
      error.status = 403;
      throw error;
    }

    await updatePassword(newPasswordHash, userId);
    res.send({ message: "Contraseña cambiada con éxito" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { updateUserPassword };
