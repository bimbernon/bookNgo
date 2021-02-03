'use strict';

const { async } = require('crypto-random-string');
const { func } = require('joi');
const Joi = require('joi');

const { findCardById } = require('../../repositories/cards-repository');

async function getCardById(req, res) {
    try {

        const { idCard } = req.params;
        console.log(idCard);
        const card = await findCardById(idCard);

        if(!card) {
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