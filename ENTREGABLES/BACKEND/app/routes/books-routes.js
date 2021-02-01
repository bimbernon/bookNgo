"use strict";

const express = require("express");
const { getBooks } = require("../controllers/books/get-books");
const { getBookByTitle } = require("../controllers/books/get-book-by-title");
const { getBookByAuthor } = require("../controllers/books/get-books-by-autor");
const {
  getBooksByCategory,
} = require("../controllers/books/get-books-by-category");
const {
  getBooksByEditorial,
} = require("../controllers/books/get-books-by-editorial");
const {
  getBooksByYearPublication,
} = require("../controllers/books/get-books-by-year-publication");
const { createBook } = require("../controllers/books/create-book");
const { deleteBookById } = require("../controllers/books/delete-book-by-id");
const { getBookById } = require("../controllers/books/get-book-by-id");
const { updateBookById } = require("../controllers/books/update-book-by-id");
const router = express.Router();

router.route("/").get((req, res) => getBooks(req, res));
router.route("/title/:title").get((req, res) => getBookByTitle(req, res));
router
  .route("/author/:nameAuthor")
  .get((req, res) => getBookByAuthor(req, res));
router
  .route("/category/nameCategory/:nameCategory")
  .get((req, res) => getBooksByCategory(req, res));
router
  .route("/editorial/:nameEditorial")
  .get((req, res) => getBooksByEditorial(req, res));
router
  .route("/yearpublication/:yearPublication")
  .get((req, res) => getBooksByYearPublication(req, res));
router.route("/id/:idBook").get((req, res) => getBookById(req, res));

router.route("/").post((req, res) => createBook(req, res));

router.route("/:idBook").delete((req, res) => deleteBookById(req, res));

router.route("/:idBook").put((req, res) => updateBookById(req, res));

module.exports = router;