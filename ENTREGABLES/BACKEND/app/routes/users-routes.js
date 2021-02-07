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
const {
  uploadImageUserProfile,
} = require("../controllers/users/upload-image-user-profile");

const router = express.Router();

//PUBLICAS
router.route("/register").post((req, res) => registerUser(req, res));
router.route("/login").post((req, res) => loginUser(req, res));

//PRIVADAS-TODOS
router
  .route("/update/:userId")
  .all(validateAuth)
  .patch((req, res) => updateUserById(req, res));
router
  .route("/profile/:userId")
  .all(validateAuth)
  .get((req, res) => getUserProfile(req, res));

//PRIVADAS-ADMIN
router
  .route("/")
  .all(validateAuth)
  .get((req, res) => getUsers(req, res));
router
  .route("/email/:userEmail")
  .all(validateAuth)
  .get((req, res) => getUserByEmail(req, res));
router
  .route("/id/:userId")
  .all(validateAuth)
  .delete((req, res) => deleteUserById(req, res));
router
  .route("/id/:userId")
  .all(validateAuth)
  .get((req, res) => getUserById(req, res));
router
  .route("/image/upload/:userId")
  .all(validateAuth)
  .put((req, res) => uploadImageUserProfile(req, res));

module.exports = router;
