"use strict";

const Joi = require("joi");
const { insertDonation } = require("../../repositories/donations-repository");

const schema = Joi.object().keys({
  userId: Joi.number().positive().required(),
  title: Joi.string().min(3).max(40).required(),
  authorsName: Joi.string().min(3).max(40).required(),
  donationDate: Joi.number()
    .min(new Date().getDate())
    .max(new Date().getFullYear()),
});

async function createDonation(req, res) {}

module.exports = { createDonation };
