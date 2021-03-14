import React from "react";
import { Reserve } from "../components/main/Reserve/Reserve";


export const UserReserveDetails = (props) => {
  const { booktitle, reserveDate, expirationDate } = props;
  console.log(props);

  return (
    <div className="reserve-details-container">
      <h1>Detalle de la reserva</h1>
      <p>{booktitle}</p>
    </div>
  );
};
