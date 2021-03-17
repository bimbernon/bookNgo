import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";
import { Reserve } from "../components/main/Reserve/Reserve";
import "../components/main/Reserve/Reserve";
import "../components/main/Reserve/Reserve.css";

export const UserReserves = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserves, setReserves] = useState([]);

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
      }
    }
    getReservesByUserId();
  }, []);

  const reservesRender = (reserves) => (
    <div className="reserve-li-item">
      <Reserve
        key={reserves.idlibro}
        bookId={reserves.idlibro}
        reservedBookTitle={reserves.titulo}
        reserveDate={reserves.fechareserva}
        expirationDate={reserves.fechaexpiracion}
        idInvoice={reserves.idfactura}
      />
    </div>
  );
  const errorMsg = "Todavia no tienes reservas disponibles.";

  if (!token) return <Redirect to="/" />;

  const noReserves =
    reserves === [] ? (
      <div className="reserves-container">
        <h1 className="reserves-title">Mis reservas</h1>
        <div className="reserve-item-list-container">
          <ul className="reserve-item-list">
            <li className="reserve-info">
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
            </li>
          </ul>
        </div>
        <div className="reserve-details-container"></div>
      </div>
    ) : (
      <div className="reserves-container">
        <h1 className="reserves-title">Mis reservas</h1>
        <div className="reserve-item-list-container">
          <ul className="reserve-item-list">{reserves.map(reservesRender)}</ul>
        </div>
        <div className="reserve-details-container"></div>
      </div>
    );
  return noReserves;
};
