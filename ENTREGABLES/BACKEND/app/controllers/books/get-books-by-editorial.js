'use strict';
const Joi = require('joi');
const { findBookByEditorial } = require('../../repositories/books-repository');
const { formatArrayBooks } = require('../../helpers/books/usefulMethods');

const schema = Joi.string().min(4).max(40).required();

async function getBooksByEditorial(req, res) {
    try {
        const { nameEditorial } = req.params;
        schema.validateAsync(nameEditorial);
        const books = await findBookByEditorial(nameEditorial);
        if (!books) { // Preguntar por que no entra por este if
            throw new Error('No se encontraron libros para esa editorial')
        }

        const booksFormateados = formatArrayBooks(books);
        res.send(booksFormateados);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports = {getBooksByEditorial};