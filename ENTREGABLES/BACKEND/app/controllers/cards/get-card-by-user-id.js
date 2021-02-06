'use strict';


const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();

async function getCardByUserId(req, res) {
    try {

        const { userId } = req.params;
        console.log(userId);

        await schema.validateAsync(userId);

        const userCard = await cardsRepository.findCardByUserId(userId);

        if(!userCard) {
            throw new Error('No se ha encontrado tarjeta asociada a este usuario.')
        }

        res.status(200).send(userCard);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    getCardByUserId,
}