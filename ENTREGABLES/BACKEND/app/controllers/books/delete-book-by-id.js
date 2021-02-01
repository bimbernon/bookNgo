'use strict';

const { removeBookById ,findBookById} = require('../../repositories/books-repository');
const Joi = require('joi');
const { object } = require('joi');

const schema = Joi.number().positive().required();

async function deleteBookById(req, res) {
    try {
        const { idBook } = req.params;

        schema.validateAsync(idBook);

        const book = await findBookById(idBook);
        if(book[0]===undefined) {
            throw new Error('No se encontro ese libro con ese id');
        }
        await removeBookById(parseInt(idBook));
        console.log(book);
        res.status(200).send('Se ha eliminado correctamente el libro con el id '+idBook );
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports={deleteBookById};