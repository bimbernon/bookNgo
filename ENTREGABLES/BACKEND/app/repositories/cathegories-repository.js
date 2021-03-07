"use strict";

const database = require("../infrastructure/database");

async function findAllCathegories() {
  const pool = await database.getPool();
  const query = "select * from categoria";
  const [cathegories] = await pool.query(query);

  return cathegories;
}

async function findLastCathegoryId() {
  const pool = await database.getPool();
  const query = "SELECT max(idcategoria) as lastCatehgoryId from categoria";
  let [id] = await pool.query(query);

  const generatedId = id[0].lastCatehgoryId + 1;
  return generatedId;
}

async function insertCathegory(cathegory) {
  const pool = await database.getPool();
  const cathegoryId = await findLastCathegoryId();

  const { cathegoryName } = cathegory;

  const insertQuery =
    "INSERT INTO categoria (idcategoria, nombrecategoria) VALUES ( ?, ?)";
  const [insertedCathegory] = await pool.query(insertQuery, [
    cathegoryId,
    cathegoryName,
  ]);

  return insertedCathegory;
}

async function eraseCathegory(cathegoryId) {
  const pool = await database.getPool();
  const query = "DELETE FROM categoria WHERE idcategoria = ?";
  await pool.query(query, cathegoryId);

  return true;
}

async function findCathegoryById(cathegoryId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM categoria WHERE idcategoria = ?";
  const [cathegories] = await pool.query(query, cathegoryId);

  return cathegories[0];
}

module.exports = {
  eraseCathegory,
  findCathegoryById,
  findAllCathegories,
  findLastCathegoryId,
  insertCathegory,
};
