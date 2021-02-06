'use strict';

const express = require('express');
const { getCard } = require('../controllers/cards/get-all-cards');
const { getCardById } = require('../controllers/cards/get-card-by-id');
const { createCard } = require('../controllers/cards/create-card');
const { updateCardById } = require('../controllers/cards/update-card-by-id');
const { removeCarById } = require('../controllers/cards/delete-card-by-id');
const { getCardByUserId } = require('../controllers/cards/get-card-by-user-id');


const router = express.Router();


router.route('/')
.get((req, res) => getCard(req, res))
.post((req, res) => createCard(req, res))

router.route('/id/:idCard')
.get((req, res) => getCardById(req, res))

router.route('/user/:userId')
.get((req, res) => getCardByUserId(req, res))

router.route('/update/:idCard')
.put((req, res)=> updateCardById(req, res))

router.route('/delete/:idCard')
.delete((req, res) => removeCarById(req, res))



module.exports = router;