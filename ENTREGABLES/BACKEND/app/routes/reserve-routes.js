"use strict";

const express = require("express");

const { createReserve } = require('../controllers/reserves/create-reserve');
const { deleteReserve} = require('../controllers/reserves/delete-reserve');
const { updateReserve } = require('../controllers/reserves/update-reserve');
const { getReservesByUserId } = require('../controllers/reserves/get-reserves-by-user');
const { getAllReserves } = require('../controllers/reserves/get-all-reserves');
const { validateAuth } = require("../middlewares/validate-auth");

const router = express.Router();

router
  .route("/")
  .all(validateAuth)
  .post((req, res) => createReserve(req, res))
  .get((req, res) => getAllReserves(req, res))

  router.route('/:bookId/:reserveDate')
  .all(validateAuth)
  .put((req, res) => updateReserve(req, res));

  router.route('/:bookId')
  .all(validateAuth)
  .delete((req, res) => deleteReserve(req, res));

router.route("/:userId")
.all(validateAuth)
.get((req, res) => getReservesByUserId(req, res));




module.exports = router;
