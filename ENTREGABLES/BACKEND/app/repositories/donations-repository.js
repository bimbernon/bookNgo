"use strict";

const database = require("../infrastructure/database");

async function findLastDonationId(donationId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM donacion WHERE iddonacion = ?";
  const [donations] = await pool.query(query, donationId);

  return donations[0];
}

async function insertDonation(donation) {
  const pool = await database.getPool();
  const donationId = await findLastDonationId();

  const { userId, title, authorsName, donationDate } = donation;

  const insertQuery =
    "INSERT INTO donacion (iddonacion, idusuario, titulo, nombreautor, fechadonacion) VALUES (?, ?, ?, ?, ?)";

  const [createdDonation] = await pool.query(insertQuery, [
    donationId,
    userId,
    title,
    authorsName,
    donationDate,
  ]);

  return createdDonation;
}

module.exports = { findLastDonationId, insertDonation };
