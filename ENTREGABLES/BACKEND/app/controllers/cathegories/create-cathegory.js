"use strict";

const Joi = require("joi");
const {
  insertCathegory,
  findLastCathegoryId,
} = require("../../repositories/cathegories-repository");

const schema = Joi.object().keys({
  cathegoryName: Joi.string().min(3).max(20).required(),
  cathegoryDescription: Joi.string().min(3).max(60).required(),
});

async function createCathegory(req, res) {
  try {
    if (req.auth.admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    await schema.validateAsync(req.body);

    const { cathegoryName, cathegoryDescription } = req.body;

    const cathegory = { cathegoryName, cathegoryDescription };

    const id = await findLastCathegoryId();

    await insertCathegory(cathegory);

    res.status(201).send({ id, cathegoryName, cathegoryDescription });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = { createCathegory };
