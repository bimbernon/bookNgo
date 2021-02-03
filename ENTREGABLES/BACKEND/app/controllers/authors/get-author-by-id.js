'use strict';

const Joi = require('joi');
const { findById } = require('../../repositories/author-repository');

const  schema = Joi.number().positive().required();

async function getAuthorById (req, res) {
    try {
        const { idAuthor } = req.params;
        
        await schema.validateAsync( idAuthor );

        const author = await findById(parseInt(idAuthor));

        if(!author) {
            const error = new Error('No se encontro el autor con ese Id');
            error.status = 400;
            throw error;
        }

        res.status(201).send(author);

    } catch(err) {
        res.status(400).send({error: err.message});
    }
}


module.exports = {
    getAuthorById
};