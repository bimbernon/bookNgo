"use strict";

const bookRepository = require("../../repositories/books-repository");

async function getBooks(req, res) {
  const books = await bookRepository.readAll();
  const booksFormateados = books.map((libro) => {
    const bookFormated = {
      titulo: libro.titulo,
      stock: libro.stock,
      precio: libro.precio,
      editorial: libro.editorial,
      Categoria: {
        nombre: libro.nombrecategoria,
        descripcion: libro.descripcioncategoria,
      },
      Usuario: {
        nombreUsuario: libro.nombreusuario,
        nombrePerfil: libro.nombreperfilusuario,
        apellido1: libro.apellido1usuario,
        apellido2: libro.apellido2usuario,
        email: libro.email,
      },
      Autor: {
        nombreAutor: libro.nombreautor,
        apellido1: libro.apel1,
        apellido2: libro.apel2,
      },
    };
    return bookFormated;
  });
  res.send(booksFormateados);
}
module.exports = { getBooks };
