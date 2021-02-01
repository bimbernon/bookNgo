'use strict'

const { detailsRepository } = require('../../repositories/details-repository');

async function createDetail(req, res) {
    try {
        const { idfactura, iddetalle, idlibro, precio } = req.body;
        const detail = {
            idfactura,
            iddetalle,
            idlibro,
            precio
        };
        await detailsRepository.createDetail(detail);
        res.send('BIEN CREADO EL DETALLE');
    } catch (err) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    }
}
module.exports= {createDetail}