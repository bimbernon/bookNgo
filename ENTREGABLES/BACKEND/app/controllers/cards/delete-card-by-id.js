"use strict";

const Joi = require("joi");

const cardsRepository = require("../../repositories/cards-repository");

const schema = Joi.number().positive().required();

async function removeCardById(req, res) {
  try {
    const { idCard } = req.params;
    const authentifiedUserId = req.auth.idusuario;
    let card = await cardsRepository.findCardByUserId(authentifiedUserId);

    if (!req.auth) {

      const error = new Error("No tienes permisos para realizar esta accion");

        throw error;
      }

    await schema.validateAsync(idCard);

    if (card[0] === undefined) {
      throw new Error(" No se ha encontrado tarjeta con ese id.");
    }

    const deletedCard = await cardsRepository.deleteCardById(parseInt(idCard));

    res.status(200).send(deletedCard);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  removeCardById,
};
