'use strict'
const { validateAuth } = require("../middlewares/validate-auth");
const express = require("express");

const { getInvoicesByUser } = require('../controllers/invoices/get-invoices-by-user');
const { createInvoice } = require('../controllers/invoices/create-invoice');
const router = express.Router();

router.route('/user/:userID')
    //  .all(validateAuth)
    .get((req, res) => getInvoicesByUser(req, res));

router.route('/')
    .all(validateAuth)
    .post((req, res) => createInvoice(req, res));


module.exports = router;