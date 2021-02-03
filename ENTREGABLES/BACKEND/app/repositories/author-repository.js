'use strict';


const { async } = require('crypto-random-string');
const { func } = require('joi');
const database = require('../../app/infrastructure/database');



async function readAll() {
    
    const pool = await database.getPool();
    const query = `SELECT * FROM autor`;
    const [ author ] = await pool.query(query);

    return author;
}

async function findById (id) {
    
    const pool = await database.getPool();
    const query = "select * from autor where idautor=?";
    const [ authorId ] = await pool.query(query, id);

    return authorId;
}

async function findByName (name) {

    const pool = await database.getPool();
    const query = "SELECT titulo FROM libro JOIN autor using(idautor) WHERE nombreautor=?";
    const [ authorName ] = await pool.query(query, name);

    return authorName;
}

async function findLastAuthorId() {

  const pool = await database.getPool();
  const query = "SELECT max(idautor) as ultimoID from autor";
  let [id] = await pool.query(query);

  const generateNewId = id[0].ultimoID + 1;
  return generateNewId;
}

async function addAuthor (author) {

  const pool = await database.getPool();
  const id = await findLastAuthorId();

  const {
    nombreautor,
    apel1,
    apel2
  } = author;

  const query =
    "INSERT INTO autor ( idautor, nombreautor, apel1, apel2 ) VALUES (?,?,?,?)";
  
    const [ authors ] = await pool.query(query, [
    id,
    nombreautor,
    apel1,
    apel2
  ]);

  return authors;
}

async function updateAuthorById(idAuthor, updateAuthor) {
  
  const {
    nombreautor,
    apel1,
    apel2,
  } = updateAuthor;

  const pool = await database.getPool();
  const query = `UPDATE autor SET nombreautor=?, apel1=?, apel2=? WHERE idautor=?`;
  
  await pool.query(query, [
    nombreautor,
    apel1,
    apel2,
    idAuthor
  ]);

  return true;
}

async function deleteById (idAuthor) {
    
    const pool = await database.getPool();
    const deleteQuery = `DELETE FROM autor WHERE idautor = ?`;
    const [ deletedAuthor ] = await pool.query(deleteQuery, idAuthor);

    return deletedAuthor;
}




module.exports = {
    addAuthor,
    deleteById,
    findById,
    findByName,
    readAll,
    updateAuthorById,
}