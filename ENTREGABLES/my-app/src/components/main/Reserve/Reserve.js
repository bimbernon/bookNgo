import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import "./Reserve.css";

const Reserve = (props) => {
  const [selectedUser] = useContext(UserContext);

  const {
    reservedBookTitle,
    reserveDate,
    reserveExpiration,
    bookId,
    children,
  } = props;

  return (
    <li className="reserve-li-item" bookId={bookId}>
      <Link to={`/reserve/${selectedUser.idusuario}/${bookId}/${reserveDate}`}>
        <div
          className="reserve-info"
          reservedBookTitle={reservedBookTitle}
          reserveExpiration={reserveExpiration}
          reserveDate={reserveDate}
        >
          {children}
          {/* <h2 className="reserve-book-title">{reservedBookTitle}</h2>
          <p className="reserve-book-date">{reserveDate} </p>
          <p className="reserve-book-expiration">{reserveExpiration} </p> */}
        </div>
      </Link>
    </li>
  );
};

export { Reserve };
