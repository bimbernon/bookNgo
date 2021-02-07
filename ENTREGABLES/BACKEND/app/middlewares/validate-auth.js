"use strict";

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      const error = new Error("No has iniciado sesión");
      error.status = 403;
      throw error;
    }

    const accessToken = authorization.split(" ")[1];

    const payload = jwt.verify(accessToken, JWT_SECRET);
    const { idusuario, nombreusuario, admin } = payload;
    req.auth = { idusuario, nombreusuario, admin };

    next();
  } catch (err) {
    res.status(401);
    res.send({ error: err.message });
  }
}

module.exports = { validateAuth };
