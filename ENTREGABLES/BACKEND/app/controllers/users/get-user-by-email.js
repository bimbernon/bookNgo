"use strict";

const Joi = require("joi");
const { findUserByEmail } = require("../../repositories/users-repository");

const schema = Joi.string().email().required();

async function getUserByEmail(req, res) {
  try {
    const { userEmail } = req.params;
    schema.validateAsync(userEmail);

    const user = await findUserByEmail(userEmail);

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

module.exports = { getUserByEmail };
