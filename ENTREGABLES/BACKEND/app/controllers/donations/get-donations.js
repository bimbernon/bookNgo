"use strict";

const { findAllDonations } = require("../../repositories/donations-repository");

async function findDonations(req, res) {
  try {
    const donations = await findAllDonations();
    res.send(donations);
  } catch (err) {
    res.send({ error: err.message });
  }
}

module.exports = { findDonations };
