'use strict';


const { async } = require('crypto-random-string');
const cardsRepository = require('../../repositories/cards-repository');

async function getCard(req, res) {
    try {

            const { admin } = req.auth;

            if (admin !== 1) {
              const error = new Error(
                "No tienes permisos para realizar esta acción"
              );
              error.status = 403;
              throw error;
            }

        const card = await cardsRepository.readAll();

        res.send(card);

    } catch {
        res.status(400).send({ error: error.message });
    }
}



module.exports = {
    getCard,
}