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
      idautor,
      nombreautor,
      apel1,
      apel2,
    } = req.body;

    const author = {
        idautor,
        nombreautor,
        apel1,
        apel2,
    };

    const authors = await authorRepository.addAuthor(author);

    res.status(201).send(authors);

  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}


module.exports = {
    createAuthor
};