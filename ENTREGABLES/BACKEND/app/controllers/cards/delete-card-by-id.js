'use strict';

const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();

async function removeCarById (req, res) {
    try {

        const { idCard } = req.params;

        await schema.validateAsync(idCard);

        const card = await cardsRepository.findCardById(idCard);

        if (card[0] === undefined) {
            throw new Error(' No se ha encontrado tarjeta con ese id.');
        }

        const deletedCard = await cardsRepository.deleteCardById(parseInt(idCard));

        res.status(200).send('La tarjeta ha sido borrada con exito.')

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    removeCarById,
}