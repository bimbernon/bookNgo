'use strict';


const { async } = require('crypto-random-string');
const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');


async function updateCardById(req, res) {
    try {

        const { idCard } = req.params;

        const card = await cardsRepository.findById(idCard);

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