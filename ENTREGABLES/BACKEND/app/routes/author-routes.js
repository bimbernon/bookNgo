'use strict';


const express = require('express');
const { createAuthor } = require('../controllers/authors/create-author');
const { getAuthors } = require('../controllers/authors/get-authors');
const { getAuthorById } = require('../controllers/authors/get-author-by-id');
const { getAuthorByName } = require('../controllers/authors/get-author-by-name');
const { removeAuthorById } = require('../controllers/authors/delete-autor-by-id');
const { updateAuthorById } = require('../controllers/authors/update-author-by-id');

const router = express.Router();


router.route('/')
.get((req, res) => getAuthors(req, res))
.post((req, res) => createAuthor(req ,res));

router.route('/name/:authorsName')
.get((req, res) => getAuthorByName(req, res))

router.route('/:idAuthor')
.get((req, res) => getAuthorById(req, res))
.put((req, res) => updateAuthorById(req, res));

router.route('/:idAuthor')
.delete((req, res) => removeAuthorById(req, res))





module.exports = router;