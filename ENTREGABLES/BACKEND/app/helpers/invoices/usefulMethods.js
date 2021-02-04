'use strict'

function formatArrayInvoices(arrayInvoices) {

    const formattedInvoices = arrayInvoices.map((invoice) => {

        const formattedDetails = invoice.details.map((detail) => {
            const formattedDetail = {
                idDetail: detail.iddetalle,
                price: detail.precio,

                Book: {
                    title: detail.titulo,
                    editorial: detail.editorial,
                    Category: {
                        nameCategory: detail.nombrecategoria,
                        descriptionCategory: detail.descripcioncategoria
                    }
                },

            }
            return formattedDetail;
        });
        const formattedInvoice = {
            idinvoice: invoice.idfactura,
            DateInvoice: invoice.fecha,
            vatInvoice: invoice.iva,
            priceShipping: invoice.precioenvio,

            // Usuario: {
            //     nombre: invoice.nombreusuario,
            //     apellido1: invoice.apel1,
            //     apellido2: invoice.apel2,
            //     nombrePerfil: invoice.nombreperfilusuario,
            //     email:invoice.email,
            //     foto: invoice.codFoto
            // },
            Detail: formattedDetails,
            Total: invoice.total,

        }
        return formattedInvoice;
    });
    return formattedInvoices;

}

module.exports = { formatArrayInvoices };