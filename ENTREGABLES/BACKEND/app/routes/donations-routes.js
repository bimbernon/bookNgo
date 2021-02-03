"use strict";

const express = require("express");

const router = express.Router();
const { createDonation } = require("../controllers/donations/create-donation");

router.route("/").post((req, res) => createDonation(req, res));

module.exports = router;
