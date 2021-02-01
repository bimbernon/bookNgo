'use strict';
const Joi = require('joi');
const {findByName} = require('../../repositories/books-repository');
const {formatArrayBooks} = require('../../helpers/books/usefulMethods');
const schema = Joi.string().min(4).max(40).required();

async function getBookByTitle(req,res) {
    try {
        const {title} = req.params;
        await schema.validateAsync(title);

        const book = await findByName(title);
        if (!book) {
            throw new Error('No se encontraron libros con ese titulo');
        }
        const bookFormated = formatArrayBooks(book);
       
        res.send(bookFormated[0]);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}
module.exports = {getBookByTitle};