'use strict';

const Joi = require('joi');

const { findByName } = require('../../repositories/author-repository');

const schema = Joi.number().positive().required();

async function getAuthorByName(req, res) {
    try {

        const { authorName } = req.params;
    
        await schema.validateAsync(authorName);
    
        const name = await findByName(authorName);
        
        if(!authorName) {
            throw new Error('No se han encontrado autores con ese nombre.')
        }
    
        res.status(200).send(authorName);

    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    getAuthorByName,
}