"use strict";

const Joi = require("joi");

const cardsRepository = require("../../repositories/cards-repository");

const schema = Joi.number().positive().required();

async function removeCardById(req, res) {
  try {
    const { cardId } = req.params;
    const authentifiedUserId = req.auth.idusuario;
    let card = await cardsRepository.findCardByUserId(authentifiedUserId);

    if (!req.auth) {
      //HAY QUE COMPROBAR QUE EL ID DE TARJETA DEL PARAMS CORRESPONDA A UNA TARJETA DEL USUARIO LOGGEADO
      const error = new Error("No tienes permisos para realizar esta accion");
      // if (cardId !== card[0]) {
      //   const error = new Error(
      //     "No tienes permisos para realizar esta acción."
      //   );
      //   throw error;
      // }
    }
    //  else {
    //   const userId = { ...req.body };
    //   card = await cardsRepository.findCardByUserId(userId);
    // }

    await schema.validateAsync(cardId);

    if (card[0] === undefined) {
      throw new Error(" No se ha encontrado tarjeta con ese id.");
    }

    const deletedCard = await cardsRepository.deleteCardById(parseInt(cardId));

    res.status(200).send("La tarjeta ha sido borrada con exito.");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = {
  removeCardById,
};
