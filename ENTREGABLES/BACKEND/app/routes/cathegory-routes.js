"use strict";

const express = require("express");
const {
  getCathegories,
} = require("../controllers/cathegories/get-cathegories");
const {
  createCathegory,
} = require("../controllers/cathegories/create-cathegory");

const router = express.Router();

router.route("/").get((req, res) => getCathegories(req, res));
router.route("/").post((req, res) => createCathegory(req, res));

module.exports = router;
