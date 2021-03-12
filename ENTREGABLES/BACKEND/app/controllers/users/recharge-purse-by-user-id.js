"use strict";

const Joi = require("joi");
const {
  findUserById,
  rechargePurse,
} = require("../../repositories/users-repository");

async function rechargeUserPurse(req, res) {
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
    const { ammount } = req.body;

    await rechargePurse(userId, parseInt(ammount));
    res.send(ammount);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { rechargeUserPurse };
