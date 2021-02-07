'use strict';

const { async } = require('crypto-random-string');
const { func } = require('joi');
const Joi = require('joi');
const authorRepository = require('../../repositories/author-repository');

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  nombreautor: Joi.string().min(2).max(40).required(),
  apel1: Joi.string().min(2).max(40).required(),
  apel2: Joi.string().min(2).max(40).required(),
});

async function updateAuthorById(req, res) {
    try {

          const { userId } = req.params;
          const authentifiedUserId = req.auth.idusuario;

          if (req.auth.admin !== 1) {
            if (authentifiedUserId !== parseInt(userId)) {
              const error = new Error(
                "No tienes permisos para realizar esta acción."
              );
              throw error;
            }
          }

        const { idAuthor } = req.params;

        await schemaId.validateAsync(idAuthor);

        const author = await authorRepository.findById(idAuthor);

        if(!author) {
            throw new Error('No se ha encontrado autor con ese id.');
        }

        const {
            nombreautor,
            apel1,
            apel2,
        } = req.body;

        await schema.validateAsync(req.body);

        const updatedAuthor = {
            nombreautor,
            apel1,
            apel2,
        };

        await authorRepository.modifyAuthorById(idAuthor, updatedAuthor);

        res.status(200).send({ 
            idAuthor,
            nombreautor,
            apel1,
            apel2
        });

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    updateAuthorById,
}

