"use strict";

const Joi = require("joi");
const {
  findDonationById,
  updateDonation,
} = require("../../repositories/donations-repository");

const schema = Joi.object().keys({
  donationCheck: Joi.number().positive().optional(),
  donationReviewed: Joi.number().positive().optional(),
});

async function updateDonationById(req, res) {
  try {
    const { donationId } = req.params;
    console.log(donationId);

    const { donationCheck, donationReviewed } = req.body;
    await schema.validateAsync(req.body);

    const donationById = await findDonationById(donationId);
    console.log(donationById);
    if (donationById.iddonacion !== parseInt(donationId)) {
      const error = new Error("No existe ninguna donación con ese id");
      error.status = 409;
      throw error;
    }

    await updateDonation({
      donationId,
      donationCheck,
      donationReviewed,
    });

    res.send({
      donationId,
      donationCheck,
      donationReviewed,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { updateDonationById };
