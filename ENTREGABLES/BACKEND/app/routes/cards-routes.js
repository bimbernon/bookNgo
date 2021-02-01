'use strict';

const express = require('express');
const { getCard } = require('../controllers/cards/get-card');
const { createCard } = require('../controllers/cards/create-card');

const router = express.Router();


router.route('/')
.get((req, res) => getCard(req, res))
.post((req, res) => createCard(req, res))



module.exports = router;