import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../components/providers/AuthProvider";
import { UserContext } from "../../../../components/providers/UserProvider";
import "./InsertReserve.css";

export const InsertReserve = (props) => {
  const { book, userMoney } = props;
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserve, setReserve] = useState([]);
  console.log(reserve);
  const noMoneyMsg =
    "Saldo insuficiente. Recarga tu monedero para continuar con la reserva.";

  const handleChangeReserve = (e) => setReserve(e.target.value);

  const insertReserveEffect = async (e) => {
    e.preventDefault();

    console.log("hyey");
    // console.log(-)
    const reserveResponse = await fetch(
      "http://localhost:3080/api/v1/reserves/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idlibro: book.idlibro,
        }),
      }
    );

    if (reserveResponse.ok) {
      const reserveResponseData = await reserveResponse.json();
      setReserve(reserveResponseData);
      console.log("llega");
      //insertInvoice(e);
    } else {
      const error = new Error("Algo ha salido mal.");
      throw error;
    }
  };

  const insertInvoice = async (e) => {
    e.preventDefault();
    console.log("libro", book);
    console.log("hyey");
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
          precioenvio: "3",
          detalles: [{ idlibro: book.idlibro, precio: book.precio }],
        }),
      }
    );

    if (invoiceResponse.ok) {
      const reserveResponseData = await invoiceResponse.json();
    } else {
      const error = new Error("Algo ha salido mal.");
      throw error;
    }
  };

  const style = {
    backgroundColor: "red",
  };

  return userMoney === 0 ? (
    <div>
      {noMoneyMsg && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            marginBottom: "1rem",
            minHeight: "1.5em",
          }}
        >
          {" "}
          {noMoneyMsg}
        </div>
      )}
      <form
        // action={`/reserves/${selectedUser.idusuario}`}
        className="reserve-form"
      >
        <button
          style={style}
          disabled
          className="book-details-reserve-button"
          type="submit"
        >
          Pagar
        </button>
      </form>
    </div>
  ) : (
    <form
      onSubmit={insertReserveEffect}
      action={`/reserves/${selectedUser.idusuario}`}
      className="reserve-form"
    >
      <button
        className="book-details-reserve-button"
        type="submit"
        value={book.idlibro}
        onClick={handleChangeReserve}
      >
        Pagar
      </button>
    </form>
  );
};
