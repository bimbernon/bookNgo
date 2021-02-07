"use strict";

const express = require("express");
const { createAuthor } = require("../controllers/authors/create-author");
const { getAuthors } = require("../controllers/authors/get-authors");
const { getAuthorById } = require("../controllers/authors/get-author-by-id");
const {
  getAuthorByName,
} = require("../controllers/authors/get-author-by-name");
const {
  removeAuthorById,
} = require("../controllers/authors/delete-author-by-id");
const {
  updateAuthorById,
} = require("../controllers/authors/update-author-by-id");
const { validateAuth } = require("../middlewares/validate-auth");

const router = express.Router();

router
  .route("/")
  .get((req, res) => getAuthors(req, res)) // PUBLICO
  .all(validateAuth)
  .post((req, res) => createAuthor(req, res));

router.route("/name/:authorsName").get((req, res) => getAuthorByName(req, res)); // PUBLICO

router
  .route("/update/:idAuthor")
  .all(validateAuth)
  .get((req, res) => getAuthorById(req, res))
  .put((req, res) => updateAuthorById(req, res));

router
  .route("/delete/:idAuthor")
  .all(validateAuth)
  .delete((req, res) => removeAuthorById(req, res));

module.exports = router;
