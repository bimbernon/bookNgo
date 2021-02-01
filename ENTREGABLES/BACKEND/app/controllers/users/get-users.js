"use strict";

const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
  const users = await findAllUsers();
  res.send(users);
}

module.exports = { getUsers };
