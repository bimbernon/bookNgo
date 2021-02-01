'use strict'
const express = require("express");

const { getInvoicesByUser } = require('../controllers/invoices/get-invoices-by-user');
const {createInvoice} = require('../controllers/invoices/create-invoice');
const router = express.Router();

router.route('/user/:userID')
    .get((req, res) => getInvoicesByUser(req, res));

router.route('/')
.post((req,res)=>createInvoice(req,res));


module.exports=router;