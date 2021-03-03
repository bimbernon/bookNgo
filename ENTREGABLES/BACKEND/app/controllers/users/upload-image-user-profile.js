" use strict";

const path = require("path");
const fs = require("fs");
const { uploadImage } = require("../../helpers/users/usefulMethods");
const { findLastUserId } = require("../../repositories/users-repository");

async function uploadImageUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const authentifiedUserId = req.auth.idusuario;

    if (req.auth.admin !== 1) {
      if (authentifiedUserId !== parseInt(userId)) {
        const error = new Error(
          "No tienes permisos para realizar esta acción."
        );
        throw error;
      }
    }

    const userImage = req.files.userImage;

    if (!req.files || !userImage) {
      const error = new Error("No se ha subido ninguna imagen.");
      error.status = 400;
      throw error;
    }

    if (!userImage.mimetype.startsWith("image")) {
      const error = new Error("Formato no válido.");
      error.status = 400;
      throw error;
    }

    await uploadImage({
      imageData: userImage.data,
      destination: process.env.PATH_USER_IMAGE,
      width: 300,
      heigth: 300,
      codFoto: authentifiedUserId,
    });

    res.send("Se ha subido la foto correctamente");
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { uploadImageUserProfile };
