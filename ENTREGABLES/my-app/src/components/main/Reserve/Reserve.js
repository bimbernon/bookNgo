import React from "react";
import { Link } from "react-router-dom";

export const Reserve = (props) => {
  const { reserveBook, reserveDate, reserveExpiration, rating } = props;
  console.log(props);
  return (
    <Link to="/reserves/:userId/info">
      <li
        className="reserve-li-item"
        reserveBook={reserveBook}
        reserveDate={reserveDate}
        reserveExpiration={reserveExpiration}
        rating={rating}
      >
        <h2>{reserveBook}</h2>
      </li>
    </Link>
  );
};
