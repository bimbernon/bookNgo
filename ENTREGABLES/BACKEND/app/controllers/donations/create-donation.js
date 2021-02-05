"use strict";

const Joi = require("joi");
const { insertDonation } = require("../../repositories/donations-repository");

const schema = Joi.object().keys({
  title: Joi.string().min(3).max(40).required(),
  authorsName: Joi.string().min(3).max(40).required(),
});

async function createDonation(req, res) {
  try {
    const userLoggedId = req.auth.idusuario;
    const { title, authorsName } = req.body;
    await schema.validateAsync(req.body);

    const donationCheck = 0;
    const donationReviewed = 0;
    const donationDate = new Date();

    const donation = {
      userId: userLoggedId,
      title,
      authorsName,
      donationDate,
      donationCheck,
      donationReviewed,
    };

    console.log(donation);

    await insertDonation(donation);
    res
      .status(201)
      .send({ userId: userLoggedId, title, authorsName, donationDate });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { createDonation };
