'use strict';

const express = require('express');

const { createReserve } = require('../controllers/reserves/create-reserve');
const { deleteReserveById } = require('../controllers/reserves/delete-reserve');
const { updateReserveById } = require('../controllers/reserves/update-reserve-by-id');
const { getReservesByUserId } = require('../controllers/reserves/get-reserves-by-user');
const { getAllReserves } = require('../controllers/reserves/get-all-reserves');

const router = express.Router()

router.route('/')
.post((req, res) => createReserve(req, res))
.get((req, res) => getAllReserves(req, res))

router.route('/:userId')
.get((req, res) => getReservesByUserId(req, res))

router.route('/:reserveId')
.delete((req, res) => deleteReserveById(req, res))
.put((req, res) => updateReserveById(req, res))




module.exports = router;
