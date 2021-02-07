'use strict';

const Joi = require('joi');

const cardsRepository = require('../../repositories/cards-repository');

const schema = Joi.number().positive().required();

async function removeCarById (req, res) {
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