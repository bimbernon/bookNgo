"use strict";

const bookRepository = require("../../repositories/books-repository");

async function createBook(req, res) {
  try {
    const {
      idcategoria,
      idusuario,
      idautor,
      titulo,
      stock,
      precio,
      editorial,
      añopublicacion,
    } = req.body;
    const book = {
      idcategoria,
      idusuario,
      idautor,
      titulo,
      stock,
      precio,
      editorial,
      añopublicacion,
    };

    const books = await bookRepository.createBook(book);
    res.status(201).send({ books });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
module.exports = { createBook };
