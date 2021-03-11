import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import "./Reserve.css";

export const Reserve = (props) => {
  const [selectedUser] = useContext(UserContext);

  const { reserveBook, reserveDate, reserveExpiration, rating } = props;
  console.log(props);

  return (
    <Link to={`/reserve/${selectedUser.idusuario}/info`}>
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
