"use strict";

const express = require("express");
const { getUsers } = require("../controllers/users/get-users");
const { getUserById } = require("../controllers/users/get-user-by-id");
const { getUserByEmail } = require("../controllers/users/get-user-by-email");
const { registerUser } = require("../controllers/users/register-user");

const router = express.Router();

router.route("/").get((req, res) => getUsers(req, res));
router.route("/id/:userId").get((req, res) => getUserById(req, res));
router.route("/email/:userEmail").get((req, res) => getUserByEmail(req, res));
router.route("/register").post((req, res) => registerUser(req, res));

module.exports = router;
