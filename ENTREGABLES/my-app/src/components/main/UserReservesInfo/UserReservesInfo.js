import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import "./UserReservesInfo.css";

export const UserReservesInfo = () => {
  const [token] = useContext(AuthContext);
  const [reserve, setReserve] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(reserve);
  let { userId } = useParams();

  useEffect(() => {
    async function getReservesByUserId() {
      const reserveResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (reserveResponse.ok) {
        const result = await reserveResponse.json();
        setReserve(result);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getReservesByUserId();
  }, []);

  const Reserve = () => <li reserve={reserve}></li>;

  const render = (reserves) => {
    return (
      <Reserve
        key={reserves.fechareserva}
        reserveBook={reserves.titulo}
        reserveDate={reserves.fechareserva}
        reserveExpiration={reserves.fechadevolucion}
        rating={reserves.rating}
      ></Reserve>
    );
  };

  return (
    <div className="reserves-container">
      <h1 className="reserves-title">Mis reservas</h1>
      <div className="reserve-item-list-container">
        <ul className="reserve-item-list">{reserve.map(render)}</ul>
      </div>
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
