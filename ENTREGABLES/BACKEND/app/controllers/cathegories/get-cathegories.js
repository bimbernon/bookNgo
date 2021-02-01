"use strict";

const {
  findAllCathegories,
} = require("../../repositories/cathegories-repository");

async function getCathegories(req, res) {
  const cathegories = await findAllCathegories();
  res.send(cathegories);
}

module.exports = { getCathegories };
