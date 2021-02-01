"use strict";
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const express = require("express");
const app = express();
app.use(express.json());

const booksRouter = require("./app/routes/books-routes");
const usersRouter = require("./app/routes/users-routes");
const cathegoriesRouter = require("./app/routes/cathegory-routes");
const authorsRouter = require("./app/routes/author-routes");
const cardsRouter = require("./app/routes/cards-routes");

const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream })); //combined, es lo mismo pero te da mas información.

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/cathegories/", cathegoriesRouter);
app.use("/api/v1/authors", authorsRouter);
app.use("/api/v1/cards", cardsRouter);

app.listen(port, () => console.log(`Listening  ${port}...`));
