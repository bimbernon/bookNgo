"use strict";

const bookRepository = require("../../repositories/books-repository");
const Joi = require("joi");

const schema = Joi.object().keys({
  idcategoria: Joi.number()
    .positive()
    .required()
    .error(
      new Error("Error, tiene que tener al menos una categoria seleccionada")
    ),
  idautor: Joi.number()
    .positive()
    .required()
    .error(new Error("Error, tiene que tener al menos un autor seleccionado")),
  titulo: Joi.string()
    .min(4)
    .max(40)
    .required()
    .error(new Error("Error, el libro tiene que tener un titulo")),
  stock: Joi.number()
    .positive()
    .required()
    .error(new Error("Error, el libro tiene que tener al menos un stock")),
  sinopsis: Joi.string()
    .min(4)
    .max(2000)
    .required()
    .error(new Error("Error, el libro tiene que tener una sipnosis")),
  precio: Joi.number()
    .positive()
    .required()
    .error(new Error("El libro tiene que tener un precio")),
  editorial: Joi.string()
    .min(4)
    .max(40)
    .required()
    .error(new Error("Error, el libro tiene que tener una editorial")),
  añopublicacion: Joi.number()
    .min(1900)
    .max(new Date().getFullYear())
    .positive()
    .required()
    .error(new Error("Error, el libro tiene que tener un año de publicacion")),
});

async function createBook(req, res) {
  try {
    const { admin } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const {
      idcategoria,
      idautor,
      titulo,
      stock,
      sinopsis,
      precio,
      editorial,
      añopublicacion,
    } = req.body;
    await schema.validateAsync(req.body);
    const book = {
      idcategoria,
      idautor,
      titulo,
      stock,
      sinopsis,
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
