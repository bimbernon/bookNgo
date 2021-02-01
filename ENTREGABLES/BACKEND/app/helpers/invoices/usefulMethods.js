'use strict'

function formatArrayInvoices(arrayInvoices) {

    const formattedInvoices = arrayInvoices.map((invoice) => {
        const formattedInvoice = {
            idfactura: invoice.idfactura,
            fechaFactura : invoice.fecha,
            ivaFactura: invoice.iva,
            precioEnvio : invoice.precioenvio,
            total: invoice.total,
            Usuario: {
                nombre: invoice.nombreusuario,
                apellido1: invoice.apel1,
                apellido2: invoice.apel2,
                nombrePerfil: invoice.nombreperfilusuario,
                email:invoice.email,
                foto: invoice.codFoto
            }
        }
        return formattedInvoice;
    });
    return formattedInvoices;

}
module.exports = {formatArrayInvoices};