'use strict';

const Joi = require('joi');

const { findByName } = require('../../repositories/author-repository');

const schema = Joi.string().required();

async function getAuthorByName(req, res) {
    try {

        const { name } = req.params;
    
        await schema.validateAsync(name);

        const authorName = await findByName(name);
        console.log(authorName);

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