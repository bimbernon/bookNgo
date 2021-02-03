"use strict";

const Joi = require("joi");
const {
  findCathegoryById,
  eraseCathegory,
} = require("../../repositories/cathegories-repository");

const schema = Joi.number().positive();

async function deleteCathegoryById(req, res) {
  try {
    const { cathegoryId } = req.params;

    await schema.validateAsync(cathegoryId);

    const cathegory = await findCathegoryById(cathegoryId);
    if (!cathegory) {
      const error = new Error("No existe ninguna categoría con ese id");
      error.status = 400;
      throw error;
    }

    await eraseCathegory(cathegoryId);

    res.send({ message: `Categoría borrada con éxito` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { deleteCathegoryById };
