"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");

const schema = Joi.number().positive().required();

async function getUserById(req, res) {
  try {
    const { userId } = req.params;
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
