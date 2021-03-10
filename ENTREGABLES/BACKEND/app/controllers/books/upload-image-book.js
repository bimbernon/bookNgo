" use strict";

const path = require("path");
const fs = require("fs");
const { uploadImage } = require("../../helpers/books/usefulMethods");
const { findLastBookId } = require("../../repositories/books-repository");

async function uploadImageBook(req, res) {
  try {
    const { admin } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const lastBookId = await findLastBookId();
    const photoBook = req.files.photoBook;

    if (!req.files || !photoBook) {
      const error = new Error("No se ha subido ninguna imagen.");
      error.status = 400;
      throw error;
    }

    if (!photoBook.mimetype.startsWith("image")) {
      const error = new Error("Formato no válido");
      error.status = 400;
      throw error;
    }

    await uploadImage({
      imageData: photoBook.data,
      destination: `${__dirname}/../../../../my-app/public/${process.env.PATH_BOOK_IMAGE}`,
      width: 300,
      height: 300,
      codFoto: lastBookId,
    });

    res.send("Se ha creado la foto correctamente");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { uploadImageBook };
