'use strict';

const { removeBookById, findBookById } = require('../../repositories/books-repository');
const Joi = require('joi');

const schema = Joi.number().positive().required();

async function deleteBookById(req, res) {
    try {
        const { idBook } = req.params;

        const { admin } = req.auth;

        if (admin !== 1) {
            const error = new Error("No tienes permisos para realizar esta acción");
            error.status = 403;
            throw error;
        }
        schema.validateAsync(idBook);

        const book = await findBookById(idBook);
        if (book[0] === undefined) {
            throw new Error('No se encontro ese libro con ese id');
        }
       const resDeleteBook= await removeBookById(parseInt(idBook));
        console.log(book);
        res.status(200).send(resDeleteBook);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { deleteBookById };