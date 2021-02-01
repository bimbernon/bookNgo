'use strict'

const Joi = require('joi');
const { deleteById, findById } = require('../../repositories/author-repository')

const schema = Joi.number().positive().required();

async function removeAuthorById(res, req) {
    try {
        const { idAuthor } = req.params;

        await schema.validateAsync(idAuthor);

        const author = await findById(idAuthor);

        if (author[0] === undefined) {
            throw new Error("No se ha encontrado autor con ese id");
        }

        await deleteById(parseInt(idAuthor));
        console.log(author);
        res.status(200).send(`El autor ha sido eliminado correctamente.`);
    } catch(err) {
        res.status(400).send({ error: err.message });
    }
}


module.exports = {
    removeAuthorById,
}