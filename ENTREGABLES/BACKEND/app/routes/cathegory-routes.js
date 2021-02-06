"use strict";

const express = require("express");
const {
  getCathegories,
} = require("../controllers/cathegories/get-cathegories");
const {
  createCathegory,
} = require("../controllers/cathegories/create-cathegory");
const {
  deleteCathegoryById,
} = require("../controllers/cathegories/delete-cathegory-by-id");
const { validateAuth } = require("../middlewares/validate-auth");

const router = express.Router();

router.route("/").get((req, res) => getCathegories(req, res));
router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createCathegory(req, res));
router
  .route("/:cathegoryId")
  .all(validateAuth)
  .delete((req, res) => deleteCathegoryById(req, res));

module.exports = router;
