"use strict";

const Joi = require("joi");

const authorRepository = require("../../repositories/author-repository");

const schema = Joi.object().keys({
  nombreautor: Joi.string().min(1).max(20).required(),
  apel1: Joi.string().min(1).max(20).required(),
  apel2: Joi.string().min(1).max(20),
});

async function createAuthor(req, res) {
  try {
    const { admin } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    const { nombreautor, apel1, apel2 } = req.body;

    await schema.validateAsync(req.body);

    const author = {
      nombreautor,
      apel1,
      apel2,
    };

    const noRepeatedAuthor = await authorRepository.findAuthorByNameAndLastName(
      author
    );

    if (noRepeatedAuthor) {
      const error = new Error("Autor ya presente en base de datos.");
      throw error;
    }

    const authors = await authorRepository.addAuthor(author);

    res.status(201).send({
      nombreautor,
      apel1,
      apel2,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  createAuthor,
};
