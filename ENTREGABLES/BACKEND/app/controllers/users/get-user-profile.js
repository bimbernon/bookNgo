"use strict";

const Joi = require("joi");
const { findUserById } = require("../../controllers/users/get-user-by-id");

async function getUserProfile(req, res) {
  try {
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUserProfile };
