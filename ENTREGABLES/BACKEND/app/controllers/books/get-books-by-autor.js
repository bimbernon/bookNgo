"use strict";
const Joi = require("joi");

const { findBookByAuthor } = require("../../repositories/books-repository");
const { formatArrayBooks } = require("../../helpers/books/usefulMethods");
const schema = Joi.string().min(4).max(40).required();
async function getBookByAuthor(req, res) {
  try {
    const { nameAuthor } = req.params;
    await schema.validateAsync(nameAuthor);
    const books = await findBookByAuthor(nameAuthor);
    if (!books) {
      throw new Error("No se encontraron libros por el nombre del autor");
    }
    const booksFormateados = formatArrayBooks(books);

    res.send(booksFormateados);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
module.exports = { getBookByAuthor };
