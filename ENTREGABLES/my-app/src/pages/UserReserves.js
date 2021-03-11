import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";
import { Reserve } from "../components/main/Reserve/Reserve";

export const UserReserves = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserve, setReserve] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
        setReserve(allReservesData);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getReservesByUserId();
  }, []);

  const reservesRender = (reserves) => (
    <Reserve bookId={reserves.idlibro} reservedBookTitle={reserves.titulo} />
  );

  return (
    <div className="reserves-container">
      <h1 className="reserves-title">Mis reservas</h1>
      <div className="reserve-item-list-container">
        <ul className="reserve-item-list">{reserve.map(reservesRender)}</ul>
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
