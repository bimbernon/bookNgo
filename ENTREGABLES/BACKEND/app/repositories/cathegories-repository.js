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

  const { cathegoryName, cathegoryDescription } = cathegory;

  const insertQuery =
    "INSERT INTO categoria (idcategoria, nombrecategoria, descripcioncategoria) VALUES (?, ?, ?)";
  const [insertedCathegory] = await pool.query(insertQuery, [
    cathegoryId,
    cathegoryName,
    cathegoryDescription,
  ]);

  return insertedCathegory;
}

module.exports = { findAllCathegories, insertCathegory, findLastCathegoryId };
