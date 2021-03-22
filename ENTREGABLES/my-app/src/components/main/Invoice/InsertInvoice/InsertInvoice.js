import React, { useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

export const InsertInvoice = (props) => {
  const { reserve } = props;
  const [, setInvoice] = useState([]);
  const [token] = useContext(AuthContext);
  const [, setErrorMsg] = useState("");
  const precioenvio = 1;

  const handleChangeInvoice = (e) => setInvoice(e.target.value);

  const createInvoiceEffect = async (e) => {
    e.preventDefault();

    const invoiceResponse = await fetch(
      "http://localhost:3080/api/v1/invoices",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          iva: "21",
          precioenvio: precioenvio,
          detalles: [{ idlibro: reserve.idlibro, precio: reserve.precio }],
        }),
      }
    );

    if (invoiceResponse.ok) {
      const invoiceResponseData = await invoiceResponse.json();
      setInvoice(invoiceResponseData);
    } else {
      setErrorMsg(invoiceResponse.error);
    }
  };

  return (
    <form onSubmit={createInvoiceEffect}>
      <button type="submit" onClick={handleChangeInvoice} value={reserve.idlibro}>
        {" "}
        <img
          src="/icons/icono-factura.png"
          alt="icono-factura"
          style={{ background: "none", height: "2rem", width: "2rem" }}
        ></img>
      </button>
    </form>
  );
};
