'use strict';
const Joi = require('joi');
const { findBookByCategory } = require('../../repositories/books-repository');
const { formatArrayBooks } = require('../../helpers/books/usefulMethods');

const schema = Joi.string().min(4).max(40).required();

async function getBooksByCategory(req, res) {
    try {
        const { nameCategory } = req.params;
        schema.validateAsync(nameCategory);
        const books = await findBookByCategory(nameCategory);
        console.log(books);
        if (!books) { // Preguntar por que no entra por este if
            throw new Error('No se encontraron libros para esa categoria')
        }
        const booksFormateados = formatArrayBooks(books);
        res.send(booksFormateados);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports= {getBooksByCategory}