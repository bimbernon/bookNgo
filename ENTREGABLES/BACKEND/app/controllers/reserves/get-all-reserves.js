'use strict';


const Joi = require('joi');

const reservesRepository = require('../../repositories/reserve-repository');



async function getAllReserves(req, res) {
    try {

       const { admin } = req.auth;
       
        if (admin !== 1) {
          const error = new Error(
            "No tienes permisos para realizar esta acción"
          );
          error.status = 403;
          throw error;
        }

        const reserves = await reservesRepository.readAll();

        res.send(reserves);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    getAllReserves,
}