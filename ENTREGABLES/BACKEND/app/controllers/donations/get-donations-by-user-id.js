"use strict";

const Joi = require("joi");
const {
  findDonationByUserId,
} = require("../../repositories/donations-repository");

const schema = Joi.number().positive().required();

async function getDonationsByUserId(req, res) {
  try {
    if (req.auth.admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const { userId } = req.params;

    await schema.validateAsync(userId);

    const donation = await findDonationByUserId(userId);
    if (!donation) {
      const error = new Error(
        "No se han encontrado donaciones realizadas por este usuario"
      );
      error.status = 400;
      throw error;
    }

    res.status(200).send(donation);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getDonationsByUserId };
