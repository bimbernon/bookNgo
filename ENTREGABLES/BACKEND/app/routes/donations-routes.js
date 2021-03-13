"use strict";

const express = require("express");

const router = express.Router();
const { createDonation } = require("../controllers/donations/create-donation");
const { findDonations } = require("../controllers/donations/get-donations");
const {
  getDonationsByUserId,
} = require("../controllers/donations/get-donations-by-user-id");
const {
  updateDonationById,
} = require("../controllers/donations/update-donation-by-id");
const { validateAuth } = require("../middlewares/validate-auth");

router
  .route("/create")
  .all(validateAuth)
  .post((req, res) => createDonation(req, res));
router
  .route("/")
  .all(validateAuth)
  .get((req, res) => findDonations(req, res));
router
  .route("/:userId")
  .all(validateAuth)
  .get((req, res) => getDonationsByUserId(req, res));
router
  .route("/update/:donationId")
  .all(validateAuth)
  .patch((req, res) => updateDonationById(req, res));

module.exports = router;
