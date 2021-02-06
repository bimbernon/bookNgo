" use strict";

const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const {
  findUserProfileImage,
  uploadImageProfile,
} = require("../../repositories/users-repository");

const validExtensions = [".jpeg", ".jpg", ".png"];

async function uploadImageUserProfile(req, res) {
  try {
    const { userId } = req.auth;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha subido ninguna imagen.");
      error.status = 400;
      throw error;
    }

    const profileImage = req.files.codFoto;
    const extension = path.extname(profileImage.name);

    if (!validExtensions.includes(extension)) {
      const error = new Error("Formato no válido");
      error.status = 400;
      throw error;
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;
    const user = await findUserByUserId(userId);
    const pathProfileImageFolder = `${__dirname}/../../../${PATH_USER_IMAGE}`;

    //FALTA HACER EL BORRADO DE LA ANTERIOR, PERO COMO VA CON CODIGO DE FOTO NO SE COMO PLANTEARLO

    //SE INSERTA LA FOTO
    const pathImage = `${pathProfileImageFolder}/${userId.codFoto}${extension}`;
    profileImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadImageProfile(userId, `${userId}${extension}`);
      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${userId}${extension}`,
      });
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { uploadImageProfile };
