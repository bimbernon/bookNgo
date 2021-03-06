"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(20).required(),
  userProfileName: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(3).max(40).required(),
  lastName1: Joi.string().min(3).max(20).required(),
  lastName2: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).max(80).required(),
  purse: Joi.number().positive().optional(),
});

async function registerUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const {
      name,
      userProfileName,
      password,
      lastName1,
      lastName2,
      email,
      address,
    } = req.body;

    const existUser = await findUserByEmail(email);
    if (existUser) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const admin = false;
    const purse = 0;

    const passwordHash = await bcrypt.hash(password, 2);

    const user = {
      name,
      admin,
      userProfileName,
      passwordHash,
      lastName1,
      lastName2,
      email,
      address,
      purse,
    };

    await createUser(user);

    res.status(201).send({
      name,
      admin,
      userProfileName,
      passwordHash,
      lastName1,
      lastName2,
      email,
      address,
      purse,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

module.exports = { registerUser };
