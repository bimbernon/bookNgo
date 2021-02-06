"use strict";
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const express = require("express");
const app = express();
app.use(express.json());

const authorsRouter = require("./app/routes/author-routes");
const booksRouter = require("./app/routes/books-routes");
const cathegoriesRouter = require("./app/routes/cathegory-routes");
const cardsRouter = require("./app/routes/cards-routes");
const reservesRouter = require("./app/routes/reserve-routes");
const invoicesRouter = require("./app/routes/invoices-routes");
const usersRouter = require("./app/routes/users-routes");

const port = process.env.SERVER_PORT || 3080;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream })); //combined, es lo mismo pero te da mas información.

app.use("/api/v1/authors", authorsRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/cathegories/", cathegoriesRouter);
app.use("/api/v1/cards", cardsRouter);
app.use("/api/v1/invoices", invoicesRouter);
app.use("/api/v1/reserves", reservesRouter);
app.use("/api/v1/users/", usersRouter);

app.listen(port, () => console.log(`Listening  ${port}...`));
