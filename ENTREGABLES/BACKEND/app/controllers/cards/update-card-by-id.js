'use strict';


const { async } = require('crypto-random-string');
const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();


async function updateCardById(req, res) {
    try {

        const { idCard } = req.params;

        await schema.validateAsync(idCard);

        const card = await cardsRepository.findCardById(idCard);

        if(card[0] === undefined) {
            throw new Error('No se ha encontrado tarjeta con ese id.')
        }

        const {
            idtarjeta,
            numerotarjeta,
            idusuario,
            fechaExpiracion,
            csv,
        } = req.body;

        if(req.body) {
            const error = new Error('Informacion de la tarjeta ya existente');
            throw error;
        }

        const updatedCard = {
            idtarjeta,
            numerotarjeta,
            idusuario,
            fechaExpiracion,
            csv,
        };

        await cardsRepository.modifiyCardById(idCard, updatedCard);
        res.send({
            numerotarjeta,
            fechaExpiracion,
            csv,
        })

    } catch(err) {
        res.status(400).send({
            error: err.message
        });
    }
}


module.exports = {
    updateCardById,
}