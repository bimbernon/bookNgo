"use strict";

const Joi = require("joi");
const {
  findUserById,
  rechargePurse,
} = require("../../repositories/users-repository");

async function rechargeUserPurse(req, res) {
  try {
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { rechargeUserPurse };
