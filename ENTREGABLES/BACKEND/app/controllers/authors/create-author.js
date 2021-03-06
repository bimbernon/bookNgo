"use strict";

const Joi = require("joi");

const authorRepository = require("../../repositories/author-repository");

const schema = Joi.object().keys({
  nombreautor: Joi.string().min(1).max(20).required(),
  apel1: Joi.string().min(1).max(20).required(),
  apel2: Joi.string().min(1).max(20).optional().allow(""),
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
    console.log(req.body, "req.body");

    await schema.validateAsync(req.body);

    const author = {
      nombreautor,
      apel1,
      apel2,
    };
    console.log(author, "author");

    const checkRepeatedAuthor = await authorRepository.findAuthorByNameAndLastName(
      author
    );

    if (checkRepeatedAuthor.length !== 0) {
      const error = new Error("autor ya presente en base de datos");
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
