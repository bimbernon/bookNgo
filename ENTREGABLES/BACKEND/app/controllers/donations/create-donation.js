"use strict";

const Joi = require("joi");
const { insertDonation } = require("../../repositories/donations-repository");

// const schema = Joi.object().keys({
//   title: Joi.string().min(3).max(40).required(),
//   authorsName: Joi.string().min(3).max(40).required(),
//   donationDate: Joi.number()
//     .min(new Date().getDate())
//     .max(new Date().getFullYear()),
// });

async function createDonation(req, res) {
  try {
    // const { userId } = req.auth;
    const { userId, title, authorsName, donationDate } = req.body;
    // await schema.validateAsync(req.body);

    const donationCheck = 0;
    const donationReviewed = 0;

    const donation = {
      userId,
      title,
      authorsName,
      donationDate,
      donationCheck,
      donationReviewed,
    };

    await insertDonation(donation);
    res.status(201).send({ userId, title, authorsName, donationDate });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { createDonation };
