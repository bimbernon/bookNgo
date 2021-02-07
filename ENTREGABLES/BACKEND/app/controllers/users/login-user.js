"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { findUserByEmail } = require("../../repositories/users-repository");
const { async } = require("crypto-random-string");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(40).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error("Usuario no registrado");
      error.status = 403;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.contraseña);
    if (!validPassword) {
      const error = new Error("Contraseña incorrecta");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { idusuario, nombreusuario, admin } = user;
    const jwtTokenExpiration = "30m";
    const payload = { idusuario, nombreusuario, admin };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = { accessToken: token, expiresIn: jwtTokenExpiration };

    res.send(response);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { loginUser };
