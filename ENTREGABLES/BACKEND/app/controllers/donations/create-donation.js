"use strict";

const Joi = require("joi");
const {
  insertDonation,
  findLastDonationId,
} = require("../../repositories/donations-repository");

// const schema = Joi.object().keys({
//   title: Joi.string().min(3).max(40).required(),
//   authorsName: Joi.string().min(3).max(40).required(),
//   donationDate: Joi.number()
//     .min(new Date().getDate())
//     .max(new Date().getFullYear()),
// });

async function createDonation(req, res) {
  try {
    // await schema.validateAsync(req.body);

    const { title, authorsName, donationDate } = req.body;

    const donation = { title, authorsName, donationDate };

    await insertDonation(donation);
    res.status(201).send({ title, authorsName, donationDate });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { createDonation };
