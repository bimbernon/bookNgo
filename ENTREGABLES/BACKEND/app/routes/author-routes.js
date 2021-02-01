'use strict';


const express = require('express');
const { createAuthor } = require('../controllers/authors/create-author');
const { getAuthors } = require('../controllers/authors/get-authors');
const { getAuthorById } = require('../controllers/authors/get-author-by-id');
const { getAuthorByName } = require('../controllers/authors/get-author-by-name');
const { deleteById } = require('../repositories/author-repository');

const router = express.Router();


router.route('/')
.get((req, res) => getAuthors(req, res))
.post((req, res) => createAuthor(req ,res))

router.route('/id/:idAuthor')
.get((req, res) => getAuthorById(req, res))
.delete((req, res) => deleteById(req, res))

router.route('/authors/name/:authorName')
.get((req, res) => getAuthorByName(req, res))




module.exports = router;