"use strict";

const bookRepository = require("../../repositories/books-repository");
const { formatArrayBooks } = require('../../helpers/books/usefulMethods');
async function getBooks(req, res) {
  const books = await bookRepository.readAll();
  // const booksFormateados = formatArrayBooks(books);
  res.send(books);
}
module.exports = { getBooks };
