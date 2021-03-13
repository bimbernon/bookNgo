"use strict";
const database = require("../infrastructure/database");

async function readAll() {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor";
  const [books] = await pool.query(query);
  return books;
}

async function findByName(nombre) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where l.titulo =?";
  const [books] = await pool.query(query, nombre);
  return books;
}

async function findBookByAuthor(nombreAutor) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where aut.nombreautor=?";
  const [books] = await pool.query(query, nombreAutor);
  return books;
}

async function findBookByCathegory(nombreCategoria) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where c.nombrecategoria=?";
  const [books] = await pool.query(query, nombreCategoria);
  return books;
}

async function findBookByEditorial(nombreEditorial) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where l.editorial=?";
  const [books] = await pool.query(query, nombreEditorial);
  return books;
}

async function findBookByYearPublication(añoPublicacion) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where l.añopublicacion=?";
  const [books] = await pool.query(query, añoPublicacion);
  return books;
}

async function findLastBooks() {
  const pool = await database.getPool();
  const query =
    "select l.*, a.* from libro l inner join autor a on l.idautor = a.idautor order by l.idlibro desc limit 5";
  const [lastBooks] = await pool.query(query);

  return lastBooks;
}

async function findLastBookId() {
  const pool = await database.getPool();
  const query = "SELECT max(idlibro) as ultimoID from libro";
  let [id] = await pool.query(query);

  const generayNewId = id[0].ultimoID + 1;
  return generayNewId;
}

async function createBook(book) {
  const pool = await database.getPool();
  const id = await findLastBookId();
  console.log(id);

  const {
    idcategoria,
    idautor,
    titulo,
    stock,
    sinopsis,
    precio,
    editorial,
    añopublicacion,
  } = book;

  const query =
    "INSERT INTO libro (idlibro,idcategoria,idautor,titulo,stock,sipnosis,precio,editorial,añopublicacion) VALUES (?,?,?,?,?,?,?,?,?)";
  const [books] = await pool.query(query, [
    id,
    idcategoria,
    idautor,
    titulo,
    stock,
    sinopsis,
    precio,
    editorial,
    añopublicacion,
  ]);
  return books;
}

async function removeBookById(idBook) {
  const pool = await database.getPool();
  const deleteQuery = "DELETE FROM libro WHERE idlibro = ?";
  const book = await pool.query(deleteQuery, idBook);
  return book;
}

async function findBookById(idBook) {
  const pool = await database.getPool();
  const query =
    "select l.*,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join autor aut on l.idautor=aut.idautor where idlibro=?";
  const [book] = await pool.query(query, idBook);

  return book;
}

async function updateBookById(idBook, updateBook) {
  const {
    idcategoria,
    idautor,
    titulo,
    stock,
    sinopsis,
    precio,
    editorial,
    añopublicacion,
  } = updateBook;
  const pool = await database.getPool();
  const query =
    "UPDATE libro set idcategoria=?,idautor=?,titulo=?,stock=?,sipnosis=?,precio=?,editorial=?,añopublicacion=? where idlibro=?";
  const resBookUpdate = await pool.query(query, [
    idcategoria,
    idautor,
    titulo,
    stock,
    sinopsis,
    precio,
    editorial,
    añopublicacion,
    idBook,
  ]);

  return resBookUpdate;
}

async function findBookByTitleEditorial(title, editorial) {
  const pool = await database.getPool();
  const query = "SELECT * FROM libro where titulo=? and editorial=?";
  const [book] = await pool.query(query, [title, editorial]);
  return book[0];
}

async function checkStockBook(idlibro) {
  const pool = await database.getPool();
  const query = "select l.stock from libro l where l.idlibro=?";
  const [book] = await pool.query(query, idlibro);

  return book[0].stock;
}

async function updateStockBook(idlibro, stock) {
  const pool = await database.getPool();
  const update = "UPDATE libro set stock=? where idlibro=?";
  await pool.query(update, [stock, idlibro]);
}

module.exports = {
  readAll,
  findByName,
  findBookByAuthor,
  findBookByCathegory,
  findBookByEditorial,
  findBookByYearPublication,
  findLastBooks,
  findLastBookId,
  createBook,
  removeBookById,
  findBookById,
  findBookByTitleEditorial,
  updateBookById,
  checkStockBook,
  updateStockBook,
};
