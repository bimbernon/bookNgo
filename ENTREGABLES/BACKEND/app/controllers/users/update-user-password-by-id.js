"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const {
  updatePassword,
  findUserById,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  password: Joi.string()
    .min(3)
    .max(40)
    .required()
    .error(new Error("La contraseña debe contener al menos 3 caracteres")),
  newPassword: Joi.string()
    .min(3)
    .max(40)
    .required()
    .error(new Error("La contraseña debe contener al menos 3 caracteres")),
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

    await schema.validateAsync(req.body);

    if (newPassword === user.contraseña) {
      const error = new Error(
        "La contraseña nueva no puede ser igual a la actual"
      );
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 2);

    const confirmPassword = await bcrypt.compare(password, user.contraseña);

    if (!confirmPassword) {
      const error = new Error("Contraseña actual incorrecta");
      error.status = 403;
      throw error;
    }

    await updatePassword(newPasswordHash, userId);
    res.send({ password: password, newPassword: newPassword });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { updateUserPassword };
