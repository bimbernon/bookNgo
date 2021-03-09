"use strict";

const booksRepository = require("../../repositories/books-repository");

async function getLastbooks(req, res) {
  const lastBooks = await booksRepository.findLastBooks();

  res.send(lastBooks);
}

module.exports = { getLastbooks };
