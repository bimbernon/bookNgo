'use strict'

function formatArrayInvoices(arrayInvoices) {

    const formattedInvoices = arrayInvoices.map((invoice) => {
    
        const formattedDetails = invoice.details.map((detail)=>{
            const formattedDetail = {
                idDetalle:detail.iddetalle,
                precio:detail.precio,
                
                Libro: {
                    titulo:detail.titulo,
                    editorial : detail.editorial,
                    Categoria: {
                        nombreCategoria:detail.nombrecategoria,
                        descripcionCategoria:detail.descripcioncategoria
                    }
                },
                
            }
            return formattedDetail;
        });
        const formattedInvoice = {
            idfactura: invoice.idfactura,
            fechaFactura : invoice.fecha,
            ivaFactura: invoice.iva,
            precioEnvio : invoice.precioenvio,
            
            Usuario: {
                nombre: invoice.nombreusuario,
                apellido1: invoice.apel1,
                apellido2: invoice.apel2,
                nombrePerfil: invoice.nombreperfilusuario,
                email:invoice.email,
                foto: invoice.codFoto
            },
            Detalle: formattedDetails,
            Total: invoice.total,
           
        }
        return formattedInvoice;
    });
    return formattedInvoices;

}

module.exports = {formatArrayInvoices};