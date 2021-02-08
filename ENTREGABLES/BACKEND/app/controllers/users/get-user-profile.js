"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");

async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const authentifiedUserId = req.auth.idusuario;
    let user = await findUserById(authentifiedUserId);

    if (req.auth.admin !== 1) {
      if (authentifiedUserId !== parseInt(userId)) {
        const error = new Error(
          "No tienes permisos para realizar esta acción."
        );
        throw error;
      }
    } else {
      user = await findUserById(userId);
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    const image = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${user.codFoto}`;
    const { ...userInfo } = user;

    res.send({ ...userInfo, image: image });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { getUserProfile };
