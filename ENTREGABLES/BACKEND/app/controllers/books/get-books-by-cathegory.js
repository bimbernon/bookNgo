'use strict';
const Joi = require('joi');
const { findBookByCathegory } = require('../../repositories/books-repository');
const { formatArrayBooks } = require('../../helpers/books/usefulMethods');

const schema = Joi.string().min(4).max(40).required();

async function getBooksByCathegory(req, res) {
    try {
        const { nameCathegory } = req.params;
        schema.validateAsync(nameCathegory);
        const books = await findBookByCathegory(nameCathegory);

        if (!books) {
            throw new Error('No se encontraron libros para esa categoria')
        }
        const booksFormateados = formatArrayBooks(books);
        res.send(booksFormateados);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports = { getBooksByCathegory }