"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");

async function getUserProfile(req, res) {
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

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;
    // Recogemos el Id del accessToken así no usamos ni tenemos que fiarnos de la URL

    const user = await findUserById(authentifiedUserId);

    const image = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${user.codFoto}`;
    const { ...userInfo } = user;

    res.send({ ...userInfo, image: image });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUserProfile };
