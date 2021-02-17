"use strict";

const Joi = require("joi");
const authorRepository = require("../../repositories/author-repository");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(20),
  lastName1: Joi.string().min(2).max(20),
  lastName2: Joi.string().min(2).max(20),
});

async function getAuthorByNameAndLastName(req, res) {
  try {
    const { name, lastName1, lastName2 } = req.body;

    await schema.validateAsync(author);

    const author = req.body;

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
