'use strict';

const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

// const schema = Joi.object().keys({
//     nombreautor: Joi.string().alphanum().required(),
//     apel1: Joi.string().alphanum().min(1).max(20).required(),
//     apel2: Joi.string().alphanum().min(1).max(20),
// });

async function createCard(req, res) {
    try {

        const {
            idtarjeta,
            numerotarjeta,
            idusuario,
            fechaExpiracion,
            csv,
        } = req.body;

        const cards = {
            idtarjeta,
            numerotarjeta,
            idusuario,
            fechaExpiracion,
            csv,
        }

        const card = await cardsRepository.addCard();

        res.status(200).send(card);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    createCard,
}