'use strict';
const Joi = require('joi');
const { findBookByYearPublication } = require('../../repositories/books-repository');
const { formatArrayBooks } = require('../../helpers/books/usefulMethods');

const schema = Joi.number().min(1900).max(new Date().getFullYear());

async function getBooksByYearPublication(req, res) {
    try {
        const { yearPublication } = req.params;
        schema.validateAsync(yearPublication);
        const books = await findBookByYearPublication(yearPublication);
        if (!books) { // Preguntar por que no entra por este if
            throw new Error('No se encontraron libros para esa editorial')
        }
        const booksFormateados = formatArrayBooks(books);
        res.send(booksFormateados);
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
}
module.exports = { getBooksByYearPublication };