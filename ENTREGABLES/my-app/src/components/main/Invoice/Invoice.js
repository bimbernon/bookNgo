import React from "react";

const Invoice = (props) => {
  const { invoice } = props;

  return (
    <div className={invoice}>
      <div className="user-information">
        <h1 className="user-name">{`Nombre: ${invoice.User.name}`}</h1>
        <h2 className="user-lastnames">{`Apellidos: ${invoice.User.lastname1} ${invoice.User.lastname2}`}</h2>
      </div>
      <div className="invoice-information">
        <h1 className="invoice-number">{`Número de factura: ${invoice.Invoice.idinvoice}`}</h1>
        <h2 className="invoice-date">{`Fecha de factura: ${invoice.Invoice.DateInvoice}`}</h2>
        <h2 className="invoice-vat">{`IVA: ${invoice.Invoice.vatInvoice}`}</h2>
        <h2 className="invoice-shipping-price">{`Precio del envío: ${invoice.Invoice.priceShipping}`}</h2>
      </div>
      <div className="reserve-information">
        <h1 className="reserve-title">{`Título del libro: ${invoice.Invoice.Detail.Book.title}`}</h1>
        <h2 className="reserve-price">{`Precio: ${invoice.Invoice.Detail.price}`}</h2>
        <h2 className="reserve-editorial">{`Editorial: ${invoice.Invoice.Detail.Book.editorial}`}</h2>
        <h2 className="reserve-cathegory">{`Categoría: ${invoice.Invoice.Detail.Book.Cathegory.nameCathegory}`}</h2>
      </div>
      <h1 className="total-price">{`TOTAL A PAGAR: ${invoice.Invoice.Total}`}</h1>
    </div>
  );
};

export { Invoice };
