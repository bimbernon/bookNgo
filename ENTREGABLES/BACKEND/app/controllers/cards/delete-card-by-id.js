'use strict';

const Joi = require('joi');

const { deleteCardById, findById }= require('../../repositories/cards-repository');

async function removeCarById (req, res) {
    try {

        const { idCard } = req.params;
        console.log(idCard);
        const card = await findById(idCard);
        console.log(card);
        if (card[0] === undefined) {
            throw new Error(' No se ha encontrado tarjeta con ese id.');
        }

        const deletedCard = await deleteCardById(parseInt(idCard));

        res.status(200).send('La tarjeta ha sido borrada con exito.')

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}



module.exports = {
    removeCarById,
}