"use strict";

const { async } = require("crypto-random-string");
const { func } = require("joi");
const database = require("../../app/infrastructure/database");

async function readAll() {
  const pool = await database.getPool();
  const query = `SELECT * FROM autor`;
  const [author] = await pool.query(query);

  return author;
}

async function findById(id) {
  const pool = await database.getPool();
  const query = `SELECT * FROM autor WHERE idautor=${id}`;
  const [authorId] = await pool.query(query);

  return authorId;
}

async function findByName(name) {
  const pool = await database.getPool();
  const query = "SELECT * FROM autor WHERE nombreautor=?";
  const [authorName] = await pool.query(query, name);

  return authorName;
}

async function findLastAuthorId() {
  const pool = await database.getPool();
  const query = "SELECT max(idautor) as ultimoID from autor";
  let [id] = await pool.query(query);

  const generateNewId = id[0].ultimoID + 1;
  return generateNewId;
}

async function addAuthor(author) {
  const pool = await database.getPool();
  const id = await findLastAuthorId();
  console.log(id);
  const { idautor, nombreautor, apel1, apel2 } = author;

  const query =
    "INSERT INTO autor ( idautor, nombreautor, apel1, apel2 ) VALUES (?,?,?,?)";
  const [authors] = await pool.query(query, [
    id,
    idautor,
    nombreautor,
    apel1,
    apel2,
  ]);

  return authors;
}

async function deleteById(id) {
  const pool = await database.getPool();
  const deleteQuery = `DELETE FROM autor WHERE idautor=?`;
  const [deletedAuthor] = await pool.query(deleteQuery, id);

  return true;
}

module.exports = {
  addAuthor,
  deleteById,
  findById,
  findByName,
  readAll,
};
