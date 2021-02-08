"use strict";

const Joi = require("joi");

const cardsRepository = require("../../repositories/cards-repository");

const schema = Joi.object().keys({
  numerotarjeta: Joi.string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required(),
  fechaExpiracion: Joi.required(),
  csv: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/),
});

async function createCard(req, res) {
  try {
    // if (!req.auth) {
    //   const error = new Error("No tienes permisos para realizar esta accion.");
    //   throw error;
    // }

    const userId = req.auth.idusuario;
    console.log(userId);

    const { numerotarjeta, fechaExpiracion, csv } = req.body;

    await schema.validateAsync(req.body);

    const cards = {
      numerotarjeta,
      idusuario: userId,
      fechaExpiracion,
      csv,
    };

    await cardsRepository.addCard(cards);

    res.status(200).send({
      numerotarjeta,
      idusuario: userId,
      fechaExpiracion,
      csv,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  createCard,
};
