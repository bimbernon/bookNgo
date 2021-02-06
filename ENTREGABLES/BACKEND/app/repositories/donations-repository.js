"use strict";

const database = require("../infrastructure/database");

async function findAllDonations() {
  const pool = await database.getPool();
  const query = "SELECT * FROM donacion";
  const [donations] = await pool.query(query);

  return donations;
}

async function findLastDonationId() {
  const pool = await database.getPool();
  const query = "SELECT MAX(iddonacion) as lastDonationId FROM donacion";
  const [donationId] = await pool.query(query);

  const generatedId = donationId[0].lastDonationId + 1;
  return generatedId;
}

async function insertDonation(donation) {
  const pool = await database.getPool();
  const donationId = await findLastDonationId();

  const {
    userId,
    title,
    authorsName,
    donationDate,
    donationCheck,
    donationReviewed,
  } = donation;

  const insertQuery =
    "INSERT INTO donacion (iddonacion, idusuario, titulo, nombreautor, fechadonacion, revisado, correcto) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const [createdDonation] = await pool.query(insertQuery, [
    donationId,
    userId,
    title,
    authorsName,
    donationDate,
    donationCheck,
    donationReviewed,
  ]);

  return createdDonation;
}

async function findDonationByUserId(donation) {
  const pool = await database.getPool();
  const query = `SELECT iddonacion, idusuario, titulo, nombreautor, fechadonacion FROM donacion WHERE idusuario = ?`;
  const [donationByUser] = await pool.query(query, donation);

  return donationByUser;
}

async function findDonationById(donationId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM donacion WHERE iddonacion = ?";
  const [donations] = await pool.query(query, donationId);

  return donations[0];
}

async function updateDonation(data) {
  const { donationId, donationCheck, donationReviewed } = data;
  const pool = await database.getPool();
  const updateQuery = `UPDATE donacion 
  SET revisado = ?, correcto = ? 
  WHERE iddonacion = ?`;
  await pool.query(updateQuery, [donationCheck, donationReviewed, donationId]);

  return true;
}

module.exports = {
  findDonationByUserId,
  findDonationById,
  findAllDonations,
  findLastDonationId,
  insertDonation,
  updateDonation,
};
