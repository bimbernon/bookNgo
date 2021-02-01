'use strict';

const authorRepository = require('../../repositories/author-repository');


async function getAuthors(req, res) {

    const author = await authorRepository.readAll();

    res.send(author)
    
}




module.exports = {
    getAuthors
};