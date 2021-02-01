"use strict";
const database = require("../infrastructure/database");

async function readAll() {
  const pool = await database.getPool();
  console.log("jose");
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor";
  console.log(query);
  const [books] = await pool.query(query);
  console.log(books);
  return books;
}

async function findByName(nombre) {
  const pool = await database.getPool();
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where l.titulo =?";
  const [books] = await pool.query(query, nombre);
  return books;
}

async function findBookByAuthor(nombreAutor) {
  const pool = await database.getPool();
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where aut.nombreautor=?";
  const [books] = await pool.query(query, nombreAutor);
  return books;
}

async function findBookByCategory(nombreCategoria) {
  const pool = await database.getPool();
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where c.nombrecategoria=?";
  const [books] = await pool.query(query, nombreCategoria);
  return books;
}

async function findBookByEditorial(nombreEditorial) {
  const pool = await database.getPool();
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where l.editorial=?";
  const [books] = await pool.query(query, nombreEditorial);
  return books;
}

async function findBookByYearPublication(añoPublicacion) {
  const pool = await database.getPool();
  console.log(añoPublicacion);
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where l.añopublicacion=?";
  const [books] = await pool.query(query, añoPublicacion);
  return books;
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
    idusuario,
    idautor,
    titulo,
    stock,
    precio,
    editorial,
    añopublicacion,
  } = book;

  const query =
    "INSERT INTO libro (idlibro,idcategoria,idusuario,idautor,titulo,stock,precio,editorial,añopublicacion) VALUES (?,?,?,?,?,?,?,?,?)";
  const [books] = await pool.query(query, [
    id,
    idcategoria,
    idusuario,
    idautor,
    titulo,
    stock,
    precio,
    editorial,
    añopublicacion,
  ]);
  return books;
}

async function removeBookById(idBook) {
  const pool = await database.getPool();
  const deleteQuery = "DELETE FROM libro WHERE idlibro = ?";
  await pool.query(deleteQuery, idBook);
  return true;
}

async function findBookById(idBook) {
  const pool = await database.getPool();
  const query =
    "select l.*,u.nombreusuario,u.nombreperfilusuario,u.apel1 as apellido1usuario, u.apel2 as apellido2usuario,u.email,aut.nombreautor,aut.apel1,aut.apel2,c.* from libro l inner join categoria c on l.idcategoria=c.idcategoria inner join usuario u on l.idusuario=u.idusuario inner join autor aut on l.idautor=aut.idautor where idlibro=?";
  const [book] = await pool.query(query, idBook);
  return book;
}

async function updateBookById(idBook, updateBook) {
  const {
    idcategoria,
    idusuario,
    idautor,
    titulo,
    stock,
    precio,
    editorial,
    añopublicacion,
  } = updateBook;
  const pool = await database.getPool();
  const query =
    "UPDATE libro set idcategoria=?,idusuario=?,idautor=?,titulo=?,stock=?,precio=?,editorial=?,añopublicacion=? where idlibro=?";
  await pool.query(query, [
    idcategoria,
    idusuario,
    idautor,
    titulo,
    stock,
    precio,
    editorial,
    añopublicacion,
    idBook,
  ]);

  return true;
}

async function findBookByTitleEditorial(title, editorial) {
  const pool = await database.getPool();
  const query = "SELECT * FROM libro where titulo=? and editorial=?";
  const [book] = await pool.query(query, [title, editorial]);
  return book[0];
}
module.exports = {
  readAll,
  findByName,
  findBookByAuthor,
  findBookByCategory,
  findBookByEditorial,
  findBookByYearPublication,
  findLastBookId,
  createBook,
  removeBookById,
  findBookById,
  findBookByTitleEditorial,
  updateBookById,
};
