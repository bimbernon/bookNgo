'use strict';


const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');



async function getAllReserves(req, res) {
    try {

        const reserves = await reservesRepository.readAll();

        res.send(reserves);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    getAllReserves,
}