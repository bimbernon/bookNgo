"use strict";

const database = require("../infrastructure/database");

async function findLastDonationId() {
  const pool = await database.getPool();
  const query = "SELECT MAX(iddonacion) as maxiddonacion FROM donacion";
  const [donations] = await pool.query(query);

  if (donations[0].maxiddonacion === null) {
    donations[0].maxiddonacion = +1;
  }

  return donations[0].maxiddonacion;
}

async function insertDonation(donation) {
  const pool = await database.getPool();
  const donationId = await findLastDonationId();

  const { title, authorsName, donationDate } = donation;

  const insertQuery =
    "INSERT INTO donacion (iddonacion, titulo, nombreautor, fechadonacion) VALUES (?, ?, ?, ?)";

  const [createdDonation] = await pool.query(insertQuery, [
    donationId,
    // userId,
    title,
    authorsName,
    donationDate,
  ]);

  return createdDonation;
}

module.exports = { findLastDonationId, insertDonation };
