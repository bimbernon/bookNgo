" use strict";

const path = require("path");
const fs = require("fs");
const { uploadImage } = require('../../helpers/books/usefulMethods');
const { findLastBookId } = require('../../repositories/books-repository');

async function uploadImageBook(req, res) {
    try {
        console.log('llega');
        const lastBookId = await findLastBookId();
        const photoBook = req.files.photoBook;

        if (!req.files || !photoBook) {
            const error = new Error("No se ha subido ninguna imagen.");
            error.status = 400;
            throw error;
        }

        if (!photoBook.mimetype.startsWith("image")) {
            const error = new Error("Formato no válido");
            error.status = 400;
            throw error;
        }

        await uploadImage({
            imageData: photoBook.data,
            destination: process.env.PATH_BOOK_IMAGE,
            width: 300,
            height: 300,
            codFoto: lastBookId
        });

        res.send('Se ha creado la foto correctamente');

        // const pathBookImageFolder = `${__dirname}/../../../images/userImages/${PATH_USER_IMAGE}`;

        // if (book.codfoto != null) {
        //     await fs.unlink(`${pathBookImageFolder}/${lastBookId}`, () => {
        //         console.log('la imagen se ha eliminado con exito');
        //     });
        // }

        //FALTA HACER EL BORRADO DE LA ANTERIOR, PERO COMO VA CON CODIGO DE FOTO NO SE COMO PLANTEARLO


    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { uploadImageBook };
