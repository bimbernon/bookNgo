import React, { useState, useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import { UserContext } from "../components/providers//UserProvider";
import { AuthContext } from "../components/providers/AuthProvider";
import { Invoice } from "../components/main/Invoice/Invoice";

const InvoiceDetails = (props) => {
  const {reserve} = props;
  const [token] = useContext(AuthContext);
  const [invoice, setInvoice] = useState([]);
  const [selectedUser] = useContext(UserContext);
  const {bookId, reserveDate} = useParams();
  console.log(invoice, "invoice");
  console.log(reserve);

  useEffect(() => {
    async function insertInvoice() {
      const userResponse = await (
        await fetch(
          `http://localhost:3080/api/v1/invoices`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: {
              idfactura: "2",
              idusuario: selectedUser.idusuario,
              fecha: reserveDate,
              iva: "21",
              precioenvio: "1",
            },
          }
        )
      ).json();

      setInvoice(userResponse);
    }
    insertInvoice();
  }, []);

  return (
    <div className="reserve-details-container">
      <Invoice ></Invoice>
    </div>
  );
};

export { InvoiceDetails };
