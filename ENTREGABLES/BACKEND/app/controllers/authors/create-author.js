'use strict';


const Joi = require('joi');

const authorRepository = require('../../repositories/author-repository');

// const schema = Joi.object().keys({
//     nombreautor: Joi.string().alphanum().required(),
//     apel1: Joi.string().alphanum().min(1).max(20).required(),
//     apel2: Joi.string().alphanum().min(1).max(20),
// });

async function createAuthor(req, res) {
  try {

    const {
      nombreautor,
      apel1,
      apel2,
    } = req.body;

    const author = {
        nombreautor,
        apel1,
        apel2,
    };

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
    createAuthor
};