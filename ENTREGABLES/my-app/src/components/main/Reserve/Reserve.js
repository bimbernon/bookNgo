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
  console.log(props);

  return (
    <li
      bookId={bookId}
      reservedBookTitle={reservedBookTitle}
      reserveDate={reserveDate}
      reserveExpiration={reserveExpiration}
    >
      {/* <Link to={`/reserve/${selectedUser.idusuario}/${bookId}/${reserveDate}`}> */}
        <div
          className="reserve-info"
          reservedBookTitle={reservedBookTitle}
          reserveExpiration={reserveExpiration}
          reserveDate={reserveDate}
        >
          {children}
        </div>
      {/* </Link> */}
    </li>
  );
};

export { Reserve };
