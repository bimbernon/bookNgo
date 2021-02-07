"use strict";
const { findBookById } = require("../../repositories/books-repository");
const { formatArrayBooks } = require("../../helpers/books/usefulMethods");
const Joi = require("joi");

const schema = Joi.number().positive().required();
async function getBookById(req, res) {
  try {
    const { admin } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const { idBook } = req.params;
    schema.validateAsync(idBook);

    const book = await findBookById(idBook);

    if (!book) {
      throw new Error("No se encontro ese libro con ese id");
    }
    const bookFormateado = formatArrayBooks(book);

    res.send(bookFormateado);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
module.exports = { getBookById };
