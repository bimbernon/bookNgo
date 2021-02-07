'use strict';


const { async } = require('crypto-random-string');
const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();


async function updateCardById(req, res) {
    try {

        const { userId } = req.params;
        const authentifiedUserId = req.auth.idusuario;

        if (req.auth.admin !== 1) {
          if (authentifiedUserId !== parseInt(userId)) {
            const error = new Error(
              "No tienes permisos para realizar esta acción."
            );
            throw error;
          }
        }

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