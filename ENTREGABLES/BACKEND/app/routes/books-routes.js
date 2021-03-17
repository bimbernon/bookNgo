"use strict";
const { validateAuth } = require("../middlewares/validate-auth");
const express = require("express");
const { getBooks } = require("../controllers/books/get-books");
const { getBookByTitle } = require("../controllers/books/get-book-by-title");
const { getLastbooks } = require("../controllers/books/get-last-books");
const { getBookByAuthor } = require("../controllers/books/get-books-by-author");
const {
  getBooksByCathegory,
} = require("../controllers/books/get-books-by-cathegory");
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
const { uploadImageBook } = require("../controllers/books/upload-image-book");
const router = express.Router();

router.route("/").get((req, res) => getBooks(req, res));
router.route("/lastBooks").get((req, res) => getLastbooks(res, res));
router.route("/title/:title").get((req, res) => getBookByTitle(req, res));
router
  .route("/author/:nameAuthor")
  .get((req, res) => getBookByAuthor(req, res));
router
  .route("/cathegory/nameCathegory/:nameCathegory")
  .get((req, res) => getBooksByCathegory(req, res));
router
  .route("/editorial/:nameEditorial")
  .get((req, res) => getBooksByEditorial(req, res));
router
  .route("/yearpublication/:yearPublication")
  .get((req, res) => getBooksByYearPublication(req, res));
router.route("/id/:idBook").get((req, res) => getBookById(req, res));

router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createBook(req, res));

router
  .route("/delete/:idBook")
  .all(validateAuth)
  .delete((req, res) => deleteBookById(req, res));

router
  .route("/book/:idBook")
  .all(validateAuth)
  .put((req, res) => updateBookById(req, res));

router
  .route("/book/image/upload")
  .all(validateAuth)
  .put((req, res) => uploadImageBook(req, res));
module.exports = router;
