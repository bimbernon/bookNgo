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
                    Cathegory: {
                        nameCathegory: detail.nombrecategoria,
                        descriptionCathegory: detail.descripcioncategoria
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
            Detail: formattedDetails,
            Total: invoice.total,

        }
        return formattedInvoice;
    });
    return formattedInvoices;

}

module.exports = { formatArrayInvoices };