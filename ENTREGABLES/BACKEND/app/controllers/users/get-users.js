"use strict";

const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
  try {
    const { admin } = req.auth;
    console.log(req.auth);
    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const users = await findAllUsers();
    res.send(users);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUsers };
