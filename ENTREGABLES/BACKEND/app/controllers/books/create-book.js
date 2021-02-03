"use strict";

const bookRepository = require("../../repositories/books-repository");
const Joi = require('joi');

const schema = Joi.object().keys({
    idcategoria : Joi.number().positive().required(),
    idusuario: Joi.number().positive().required(),
    idautor: Joi.number().positive().required(),
    titulo: Joi.string().min(4).max(40).required(),
    stock: Joi.number().positive().required(),
    precio: Joi.number().positive().required(),
    editorial: Joi.string().min(4).max(40).required(),
    añopublicacion: Joi.number().min(1900).max(new Date().getFullYear()).positive().required(),
});

async function createBook(req, res) {
  try {
    const {
      idcategoria,
      idusuario,
      idautor,
      titulo,
      stock,
      precio,
      editorial,
      añopublicacion,
    } = req.body;
    await schema.validateAsync(req.body);
    const book = {
      idcategoria,
      idusuario,
      idautor,
      titulo,
      stock,
      precio,
      editorial,
      añopublicacion,
    };

    const books = await bookRepository.createBook(book);
    res.status(201).send({ books });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
module.exports = { createBook };
