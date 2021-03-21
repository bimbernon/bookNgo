import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../components/providers/AuthProvider";
import { UserContext } from "../components/providers/UserProvider";
import { Reserve } from "../components/main/Reserve/Reserve";
import "../components/main/Reserve/Reserve";
import "../components/main/Reserve/Reserve.css";

export const UserReserves = () => {
  const [token] = useContext(AuthContext);
  const [selectedUser] = useContext(UserContext);
  const [reserve, setReserve] = useState([]);
  console.log(reserve);

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
        expirationDate={reserves.fechadevolucion}
      >
        <Link to={`/reserve/${reserve.idlibro}/${reserve.fechareserva}`}>
          <img
            src="/icons/icono-factura.png"
            alt="icono-factura"
            style={{ background: "none", height: "2rem", width: "2rem" }}
          ></img>
        </Link>
      </Reserve>
    </div>
  );
  const errorMsg = "Todavia no tienes reservas disponibles.";

  if (!token) return <Redirect to="/" />;

  if (reserve.length === 0) {
    return (
      <div className="reserves-container">
        <h1 className="reserves-title">Mis reservas</h1>
        <div className="reserve-item-list-container">
          <ul className="reserve-item-list">
            <li
              className="reserve-info"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.623)",
                borderRadius: "30px",
                height: "60vh",
                width: "90vw",
              }}
            >
              {/* {errorMsg && ( */}
              <div
                style={{
                  color: "red",
                  minHeight: "1.5em",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {errorMsg}
              </div>
              {/* )} */}
            </li>
          </ul>
        </div>
        <div className="reserve-details-container"></div>
      </div>
    );
  } else {
    return (
      <div className="reserves-container">
        <h1 className="reserves-title">Mis reservas</h1>
        <div className="reserve-item-list-container">
          <ul className="reserve-item-list">{reserve.map(reservesRender)}</ul>
        </div>
      </div>
    );
  }
  // return reserves.lenght === 0 ? (
  //   <div className="reserves-container">
  //     <h1 className="reserves-title">Mis reservas</h1>
  //     <div className="reserve-item-list-container">
  //       <ul className="reserve-item-list">
  //         <li className="reserve-info">
  //           {/* {errorMsg && ( */}
  //           <div
  //             style={{
  //               color: "red",
  //               minHeight: "1.5em",
  //               textAlign: "center",
  //               marginTop: "20px",
  //             }}
  //           >
  //             {errorMsg}
  //           </div>
  //           {/* )} */}
  //         </li>
  //       </ul>
  //     </div>
  //     <div className="reserve-details-container"></div>
  //   </div>
  // ) : (
  //   <div className="reserves-container">
  //     <h1 className="reserves-title">Mis reservas2</h1>
  //     <div className="reserve-item-list-container">
  //       <ul className="reserve-item-list">{reserves.map(reservesRender)}</ul>
  //     </div>
  //     <div className="reserve-details-container"></div>
  //   </div>
  // );
};
