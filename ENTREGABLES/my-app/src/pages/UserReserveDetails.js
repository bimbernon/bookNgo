import React, { useEffect, useContext, useState } from "react";
import { Reserve } from "../components/main/Reserve/Reserve";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";

export const UserReserveDetails = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserveInfo, setReserveInfo] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getReservesByUserId() {
      const reserveResponse = await fetch(
        `http://localhost:3080/api/v1/reserves/search`,
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
        setReserveInfo(reserveData);
        console.log(reserveData);
      } else {
        const errorMsg = await reserveResponse.json();
        setErrorMsg("Algo ha salido mal...");
      }
    }
    getReservesByUserId();
  }, []);

  return (
    <div>
      <Reserve>
        <h1>Detalle de la reserva</h1>
      </Reserve>
    </div>
  );
};
