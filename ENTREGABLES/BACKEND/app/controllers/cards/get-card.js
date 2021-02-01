'use strict';


const { async } = require('crypto-random-string');
const cardsRepository = require('../../repositories/cards-repository');

async function getCard(req, res) {
    try {

        const card = await cardsRepository.readAll();

        res.send(card);
        console.log(card);

    } catch {
        res.status(400).send({ error: error.message });
    }
}



module.exports = {
    getCard,
}