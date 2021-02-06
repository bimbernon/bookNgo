"use strict";

const Joi = require("joi");
const { findUserById } = require("../../controllers/users/get-user-by-id");

async function getUserProfile(req, res) {
  try {
    if (req.auth.admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUserProfile };
