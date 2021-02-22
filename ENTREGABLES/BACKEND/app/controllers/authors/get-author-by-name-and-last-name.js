"use strict";

const Joi = require("joi");
const authorRepository = require("../../repositories/author-repository");

const schema = Joi.object().keys({
  nombreautor: Joi.string().min(2).max(20),
  apel1: Joi.string().min(2).max(20),
  apel2: Joi.string().min(2).max(20),
});

async function getAuthorByNameAndLastName(req, res) {
  try {
    const { nombreautor, apel1, apel2 } = req.body;

    await schema.validateAsync(req.body);

    const author = {
      nombreautor,
      apel1,
      apel2,
    };

    const checkAuthor = await authorRepository.findAuthorByNameAndLastName(
      author
    );

    res.status(200).send(checkAuthor);
  } catch (err) {
    const error = new Error("Algo ha salido mal.");
    throw error;
  }
}

module.exports = {
  getAuthorByNameAndLastName,
};
