'use strict';


const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();

async function getCardByUserId(req, res) {
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