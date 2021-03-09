import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserReservesInfo.css";

export const UserReservesInfo = () => {
  const [reserve, setReserve] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  let {userId} = useParams();
  console.log(reserve);

  useEffect(() => {
    async function getReservesByUserId() {
      const reserveResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/${userId}`
      );
      if (reserveResponse.ok) {
        await reserveResponse.json();
        setReserve(reserveResponse);
        console.log(reserveResponse);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...")
      }
    }
    getReservesByUserId();
  }, []);

  const Reserve = () => {
    return <li className="reserve-item"></li>;
  };

  const renderReserves = (reserve) => (
    <Reserve
      key={reserve.idusuario}
      bookIdId={reserve.libro}
      userID={reserve.idusuario}
      reserveDate={reserve.fechareserva}
      reserveExpiration={reserve.fechadevolucion}
      rating={reserve.rating}
    ></Reserve>
  );

  return (
    <div className="reserves-container">
      <h1 className="reserves-title">Mis reservas</h1>
      <div className="reserve-item-list-container">
        <ul className="reserve-item-list">{reserve.map(renderReserves)}</ul>
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
