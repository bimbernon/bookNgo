"use strict";

const express = require("express");
const { validateAuth } = require("../middlewares/validate-auth");
const { deleteUserById } = require("../controllers/users/delete-user-by-id");
const { getUsers } = require("../controllers/users/get-users");
const { getUserById } = require("../controllers/users/get-user-by-id");
const { getUserByEmail } = require("../controllers/users/get-user-by-email");
const { loginUser } = require("../controllers/users/login-user");
const { registerUser } = require("../controllers/users/register-user");
const { updateUserById } = require("../controllers/users/update-user");
const { getUserProfile } = require("../controllers/users/get-user-profile");

const router = express.Router();

router
  .route("/")
  .all(validateAuth)
  .get((req, res) => getUsers(req, res));
router.route("/id/:userId").get((req, res) => getUserById(req, res));
router.route("/email/:userEmail").get((req, res) => getUserByEmail(req, res));
router.route("/register").post((req, res) => registerUser(req, res));
router
  .route("/:userId")
  .all(validateAuth)
  .delete((req, res) => deleteUserById(req, res));
router.route("/login").post((req, res) => loginUser(req, res));
router.route("/update/:userId").patch((req, res) => updateUserById(req, res));
router.route("/profile").put((req, res) => getUserProfile(req, res));

module.exports = router;
