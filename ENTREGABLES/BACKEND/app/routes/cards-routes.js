"use strict";

const express = require("express");
const { getCard } = require("../controllers/cards/get-all-cards");
const { getCardById } = require("../controllers/cards/get-card-by-id");
const { createCard } = require("../controllers/cards/create-card");
const { updateCardById } = require("../controllers/cards/update-card-by-id");
const { removeCardById } = require("../controllers/cards/delete-card-by-id");
const { getCardByUserId } = require("../controllers/cards/get-card-by-user-id");
const { all } = require("./books-routes");
const { validateAuth } = require("../middlewares/validate-auth");

const router = express.Router();

router
  .route("/")
  .all(validateAuth)
  .get((req, res) => getCard(req, res))
  .post((req, res) => createCard(req, res));

router
  .route("/id/:idCard")
  .all(validateAuth)
  .get((req, res) => getCardById(req, res));

router
  .route("/user/:userId")
  .all(validateAuth)
  .get((req, res) => getCardByUserId(req, res));

router
  .route("/update/:idCard")
  .all(validateAuth)
  .put((req, res) => updateCardById(req, res));

router
  .route("/delete/:idCard")
  .all(validateAuth)
  .delete((req, res) => removeCardById(req, res));

module.exports = router;
