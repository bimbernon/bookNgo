import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import "./Reserve.css";

export const Reserve = (props) => {
  const [selectedUser] = useContext(UserContext);

  const { reserveBook, reserveDate, reserveExpiration, rating, bookId } = props;
  console.log(reserveBook)

  return (
    <Link to={`/reserve/${selectedUser.idusuario}/${bookId}/${reserveDate}`}>
      <li
        className="reserve-li-item"
        reserveBook={reserveBook}
        reserveDate={reserveDate}
        reserveExpiration={reserveExpiration}
        rating={rating}
        bookId={bookId}
      >
        <h2>{reserveBook}</h2>
      </li>
    </Link>
  );
};
