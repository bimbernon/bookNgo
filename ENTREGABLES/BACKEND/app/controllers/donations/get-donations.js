"use strict";

const { findAllDonations } = require("../../repositories/donations-repository");

async function findDonations(req, res) {
  try {
    if (req.auth.admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const donations = await findAllDonations();
    res.send(donations);
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports = { findDonations };
