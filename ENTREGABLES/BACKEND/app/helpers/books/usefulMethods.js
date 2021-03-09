"use strict";
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");
const fs = require("fs");

async function uploadImage({ imageData, destination, width, height, codFoto }) {
  const uploadDirectory = path.join("", destination);
  console.log("ruta directorio " + uploadDirectory);
  await ensureDir(uploadDirectory);

  const image = sharp(imageData);

  image.resize(width, height);
  console.log(codFoto);
  const imageName = codFoto + ".jpg";

  await image.toFile(path.join(uploadDirectory, imageName));

  return imageName;
}
function formatArrayBooks(array) {
  const booksFormateados = array.map((book) => {
    const bookFormated = {
      idLibro: book.idlibro,
      titulo: book.titulo,
      stock: book.stock,
      precio: book.precio,
      editorial: book.editorial,
      sinopsis: book.sinopsis,
      Categoria: {
        nombreCategoria: book.nombrecategoria,
      },
      Autor: {
        nombreAutor: book.nombreautor,
        apellido1: book.apel1,
        apellido2: book.apel2,
      },
    };
    return bookFormated;
  });
  return booksFormateados;
}
module.exports = { formatArrayBooks, uploadImage };
