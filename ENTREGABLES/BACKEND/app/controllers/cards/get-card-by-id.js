'use strict';

const { async } = require('crypto-random-string');
const { func } = require('joi');
const Joi = require('joi');

const { findCardById } = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();

async function getCardById(req, res) {
    try {
        const { admin } = req.auth;

        if (admin !== 1) {
          const error = new Error(
            "No tienes permisos para realizar esta acción"
          );
          error.status = 403;
          throw error;
        }
        
      const { idCard } = req.params;

      await schema.validateAsync(idCard);

      const card = await findCardById(idCard);

      if (!card) {
        const error = new Error("No se encontro la tarjeta con ese Id");
        error.status = 400;
        throw error;
      }

      res.status(200).send(card);
    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    getCardById,
}