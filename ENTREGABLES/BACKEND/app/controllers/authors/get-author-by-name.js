'use strict';

const Joi = require('joi');

const { findByName } = require('../../repositories/author-repository');

const schema = Joi.string().max(20).required();

async function getAuthorByName(req, res) {
    try {
      if(!req.auth) {
          const error = new Error('No estas logueado.');
          throw error;
      }

      const { authorsName } = req.params;

      await schema.validateAsync(authorsName);

      const authorName = await findByName(authorsName);

      if (!authorName) {
        throw new Error("No se han encontrado autores con ese nombre.");
      }

      res.status(200).send(authorName);
    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    getAuthorByName,
}