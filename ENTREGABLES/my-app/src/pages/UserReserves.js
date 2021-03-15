import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";
import { Reserve } from "../components/main/Reserve/Reserve";
import "../components/main/Reserve/Reserve.css";

export const UserReserves = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserves, setReserves] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [reserveInfo, setReserveInfo] = useState([]);

  useEffect(() => {
    async function getReservesByUserId() {
      const reserveResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/${selectedUser.idusuario}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (reserveResponse.ok) {
        const allReservesData = await reserveResponse.json();
        setReserves(allReservesData);
        console.log(allReservesData);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getReservesByUserId();
  }, []);

  const reservesRender = (reserves) => (
    <div className="reserve-li-item">
      <Reserve
        bookId={reserves.idlibro}
        reservedBookTitle={reserves.titulo}
        reserveDate={reserves.fechareserva}
        expirationDate={reserves.fechaexpiracion}
      >
        <h1 className="reserve-book-title">{reserves.titulo}</h1>
        <p className="reserve-book-title">{reserves.fechareserva}</p>
        <p className="reserve-book-title">{reserves.fechaexpiracion}</p>
      </Reserve>
    </div>
  );
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState([]);

  useEffect(() => {
    async function getUsersInvoices() {
      const userInvoices = await (
        await fetch(
          `http://localhost:3080/api/v1/invoices/user/${selectedUser.idusuario}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).json();
      setInvoices(userInvoices);
    }
    getUsersInvoices();
  }, []);

  console.log(invoices);

  return (
    <div className="reserves-container">
      <h1 className="reserves-title">Mis reservas</h1>
      <div className="reserve-item-list-container">
        <ul className="reserve-item-list">{reserves.map(reservesRender)}</ul>
      </div>
      <div className="reserve-details-container"></div>
      {errorMsg && (
        <div
          style={{
            color: "red",
            minHeight: "1.5em",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          {errorMsg}
        </div>
      )}
    </div>
  );
};
