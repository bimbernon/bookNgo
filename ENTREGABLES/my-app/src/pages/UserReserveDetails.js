import React, { useEffect, useContext, useState } from "react";
import { Reserve } from "../components/main/Reserve/Reserve";
import { AuthContext } from "../components/providers/AuthProvider";
import { useParams } from "react-router-dom";

export const UserReserveDetails = () => {
  const [token] = useContext(AuthContext);
  const [reserveInfo, setReserveInfo] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  let { idusuario, idlibro, fechareserva } = useParams();
  console.log(idusuario, idlibro, fechareserva);

  useEffect(() => {
    async function getReservesByUserId() {
      const reserveResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/search/${idusuario}/${idlibro}/${fechareserva}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (reserveResponse.ok) {
        const reserveData = await reserveResponse.json();
        console.log(reserveData);
        setReserveInfo(reserveData);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getReservesByUserId();
  }, []);

  console.log(reserveInfo);

  return (
    <div className="reserve-details-container">
      <h1>Detalle de la reserva</h1>
      <Reserve
        reserveBook={reserveInfo.titulo}
        reserveDate={reserveInfo.fechareserva}
        reserveExpiration={reserveInfo.reserveExpiracion}
        bookId={reserveInfo.idlibro}
      ></Reserve>
    </div>
  );
};
