"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

const {
  findUserByEmail,
  updateUser,
  findUserById,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).optional(),
  userProfileName: Joi.string().alphanum().min(3).max(20).optional(),
  password: Joi.string().min(3).max(40).optional(),
  lastName1: Joi.string().alphanum().min(3).max(20).optional(),
  lastName2: Joi.string().alphanum().min(3).max(20).optional(),
});

// const schemaPassword = Joi.object().keys({
//   password: Joi.string().min(3).max(40).required(),
// });

async function updateUserById(req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);

    const { name, userProfileName, password, lastName1, lastName2 } = req.body;
    await schema.validateAsync(req.body);

    const userById = await findUserById(userId);
    console.log(userById);

    if (userById.idusuario !== userId) {
      const error = new Error("No existe ningun usuario con ese id");
      error.status = 409;
      throw error;
    }

    // const user = await findUserByEmail(email);
    // if (user && user.id !== userId) {
    //   const error = new Error("Ya existe un usuario con ese email");
    //   error.status = 409;
    //   throw error;
    // }

    // let updatedPassword = userById.contraseña;
    // if (password) {
    //   await schemaPassword.validateAsync({ password });
    //   const passwordHash = await bcrypt.hash(password, 1);

    //   updatedPassword = passwordHash;
    // }

    await updateUser({
      name,
      userProfileName,
      password,
      lastName1,
      lastName2,
    });

    res.send({
      name,
      userProfileName,
      password,
      lastName1,
      lastName2,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { updateUserById };
