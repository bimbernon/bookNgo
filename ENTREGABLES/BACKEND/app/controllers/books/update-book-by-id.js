"use strict";
const Joi = require("joi");
const bookRepository = require("../../repositories/books-repository");

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  idcategoria: Joi.number().positive().required(),
  idautor: Joi.number().positive().required(),
  titulo: Joi.string().min(4).max(40).required(),
  stock: Joi.number().positive().required(),
  sipnosis: Joi.string().min(4).max(2000).required(),
  precio: Joi.number().positive().required(),
  editorial: Joi.string().min(4).max(40),
  añopublicacion: Joi.number().min(1900).max(new Date().getFullYear()),
});

async function updateBookById(req, res) {
  try {
    const { idBook } = req.params;
    await schemaId.validateAsync(idBook);
    const { admin } = req.auth;
    const { idusuario } = req.auth;

    if (admin !== 1) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }
    const book = await bookRepository.findBookById(idBook);
    if (book[0] === undefined) {
      throw new Error("No se encontro ese libro con ese id");
    }
    await schema.validateAsync(req.body);

    const {
      idcategoria,
      idautor,
      titulo,
      stock,
      sipnosis,
      precio,
      editorial,
      añopublicacion,
    } = req.body;
    const existTitleEditorial = await bookRepository.findBookByTitleEditorial(
      titulo,
      editorial
    );

    if (
      existTitleEditorial &&
      existTitleEditorial.idlibro !== parseInt(idBook)
    ) {
      const error = new Error(
        `Ya existe ese titulo en el id ${existTitleEditorial.idlibro}`
      );
      error.status = 409;
      throw error;
    }

    const updateBook = {
      idcategoria,
      idusuario,
      idautor,
      titulo,
      stock,
      sipnosis,
      precio,
      editorial,
      añopublicacion,
    };

    const resBookUpdate = await bookRepository.updateBookById(
      idBook,
      updateBook
    );

    res.status(200).send({ resBookUpdate });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}
module.exports = { updateBookById };
